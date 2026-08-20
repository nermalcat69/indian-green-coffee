import type { APIRoute } from 'astro';
import { insertOrder, attachCashfreeOrderId, type GraycupOrdersEnv } from '../../lib/db';
import { createCashfreeOrder } from '../../lib/cashfree';
import { products } from '../../data/products';
import { siteConfig } from '../../config/site';

export const prerender = false;

type CheckoutItem = { slug: string; qtyKg: number };

type CheckoutBody = {
	name: string;
	phone: string;
	email: string;
	gstNumber?: string;
	addressLine1: string;
	addressLine2?: string;
	city: string;
	state: string;
	pincode: string;
	notes?: string;
	items: CheckoutItem[];
};

function jsonError(message: string, status = 400) {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { 'content-type': 'application/json' },
	});
}

export const POST: APIRoute = async ({ request, locals }) => {
	let body: CheckoutBody;
	try {
		body = await request.json();
	} catch {
		return jsonError('Invalid JSON body');
	}

	const {
		name,
		phone,
		email,
		gstNumber,
		addressLine1,
		addressLine2,
		city,
		state,
		pincode,
		notes,
		items,
	} = body;

	if (!name?.trim() || !phone?.trim() || !email?.trim()) {
		return jsonError('Name, phone, and email are required');
	}
	if (!addressLine1?.trim() || !city?.trim() || !state?.trim() || !pincode?.trim()) {
		return jsonError('Address, city, state, and pincode are required');
	}
	if (!Array.isArray(items) || items.length === 0) {
		return jsonError('At least one product is required');
	}

	// Recompute pricing server-side — never trust client-submitted totals.
	const lineItems: Array<{
		slug: string;
		name: string;
		qtyKg: number;
		pricePerKg: number;
		lineTotal: number;
	}> = [];

	for (const raw of items) {
		const product = products.find((p) => p.slug === raw?.slug);
		if (!product) {
			return jsonError(`Unknown product: ${raw?.slug}`);
		}
		const qtyKg = Number(raw.qtyKg);
		if (!Number.isFinite(qtyKg) || qtyKg <= 0) {
			return jsonError(`Invalid quantity for ${product.name}`);
		}
		if (qtyKg < product.minimumOrder.quantity) {
			return jsonError(
				`${product.name} requires a minimum order of ${product.minimumOrder.quantity}${product.minimumOrder.unit}`
			);
		}
		const pricePerKg = product.priceRange.min;
		const lineTotal = Math.round(pricePerKg * qtyKg);
		lineItems.push({ slug: product.slug, name: product.name, qtyKg, pricePerKg, lineTotal });
	}

	const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
	const totalAmount = subtotal;

	const env = (locals as { runtime?: { env?: GraycupOrdersEnv } }).runtime?.env;
	const orderId = crypto.randomUUID();

	try {
		await insertOrder(env, {
			orderId,
			customerName: name.trim(),
			customerEmail: email.trim(),
			customerPhone: phone.trim(),
			gstNumber: gstNumber?.trim() || null,
			addressLine1: addressLine1.trim(),
			addressLine2: addressLine2?.trim() || null,
			city: city.trim(),
			state: state.trim(),
			pincode: pincode.trim(),
			notes: notes?.trim() || null,
			items: lineItems,
			subtotal,
			total: totalAmount,
		});

		const phoneDigits = phone.replace(/\D/g, '').slice(-10);

		const { cfOrderId, paymentSessionId } = await createCashfreeOrder({
			orderId,
			amount: totalAmount,
			customer: {
				customerId: orderId,
				name: name.trim(),
				email: email.trim(),
				phone: phoneDigits,
			},
			returnUrl: `${siteConfig.siteUrl}/checkout/success?order_id=${orderId}`,
			notifyUrl: `${siteConfig.siteUrl}/api/cashfree/webhook`,
		});

		await attachCashfreeOrderId(env, orderId, cfOrderId);

		return new Response(JSON.stringify({ orderId, paymentSessionId }), {
			status: 200,
			headers: { 'content-type': 'application/json' },
		});
	} catch (err) {
		console.error(err);
		return jsonError(err instanceof Error ? err.message : 'Internal server error', 500);
	}
};
