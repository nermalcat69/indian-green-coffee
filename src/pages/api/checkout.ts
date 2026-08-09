import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb, order } from '../../lib/db';
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

export const POST: APIRoute = async ({ request }) => {
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

	let db: ReturnType<typeof getDb>;
	try {
		db = getDb();
	} catch (err) {
		console.error(err);
		return jsonError('Payment gateway is not configured yet', 500);
	}

	const addressSnapshot = {
		name: name.trim(),
		phone: phone.trim(),
		email: email.trim(),
		addressLine1: addressLine1.trim(),
		addressLine2: addressLine2?.trim() || null,
		city: city.trim(),
		state: state.trim(),
		pincode: pincode.trim(),
		notes: notes?.trim() || null,
	};

	try {
		const [row] = await db
			.insert(order)
			.values({
				addressSnapshot,
				items: lineItems,
				subtotal: subtotal.toFixed(2),
				deliveryCharge: '0',
				totalAmount: totalAmount.toFixed(2),
				paymentStatus: 'pending',
				gstNumber: gstNumber?.trim() || null,
				customerName: name.trim(),
				customerEmail: email.trim(),
				customerPhone: phone.trim(),
				notes: notes?.trim() || null,
			})
			.returning({ id: order.id });

		const phoneDigits = phone.replace(/\D/g, '').slice(-10);

		const { cfOrderId, paymentSessionId } = await createCashfreeOrder({
			orderId: row.id,
			amount: totalAmount,
			customer: {
				customerId: row.id,
				name: name.trim(),
				email: email.trim(),
				phone: phoneDigits,
			},
			returnUrl: `${siteConfig.siteUrl}/checkout/success?order_id=${row.id}`,
			notifyUrl: `${siteConfig.siteUrl}/api/cashfree/webhook`,
		});

		await db.update(order).set({ cashfreeOrderId: cfOrderId }).where(eq(order.id, row.id));

		return new Response(JSON.stringify({ orderId: row.id, paymentSessionId }), {
			status: 200,
			headers: { 'content-type': 'application/json' },
		});
	} catch (err) {
		console.error(err);
		return jsonError(err instanceof Error ? err.message : 'Internal server error', 500);
	}
};
