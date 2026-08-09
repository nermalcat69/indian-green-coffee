import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb, order } from '../../../lib/db';
import { verifyCashfreeWebhookSignature } from '../../../lib/cashfree';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const rawBody = await request.text();
	const signature = request.headers.get('x-webhook-signature');
	const timestamp = request.headers.get('x-webhook-timestamp');

	if (!signature || !timestamp) {
		return new Response('Missing signature headers', { status: 400 });
	}

	let valid: boolean;
	try {
		valid = verifyCashfreeWebhookSignature(rawBody, signature, timestamp);
	} catch (err) {
		console.error(err);
		return new Response('Webhook verification not configured', { status: 500 });
	}

	if (!valid) {
		return new Response('Invalid signature', { status: 400 });
	}

	let payload: {
		type?: string;
		data?: {
			order?: { order_id?: string };
			payment?: { cf_payment_id?: string; payment_status?: string };
		};
	};
	try {
		payload = JSON.parse(rawBody);
	} catch {
		return new Response('Invalid JSON payload', { status: 400 });
	}

	const cfOrderId = payload.data?.order?.order_id;
	const paymentStatusRaw = payload.data?.payment?.payment_status;
	const cfPaymentId = payload.data?.payment?.cf_payment_id;

	if (!cfOrderId) {
		return new Response('Missing order_id in payload', { status: 400 });
	}

	const paymentStatus =
		payload.type === 'PAYMENT_SUCCESS_WEBHOOK' || paymentStatusRaw === 'SUCCESS'
			? 'paid'
			: payload.type === 'PAYMENT_FAILED_WEBHOOK' || paymentStatusRaw === 'FAILED'
				? 'failed'
				: null;

	if (!paymentStatus) {
		// Other event types (user dropped off, refunds, etc.) — acknowledge and ignore.
		return new Response('ok', { status: 200 });
	}

	try {
		const db = getDb();
		await db
			.update(order)
			.set({
				paymentStatus,
				cashfreePaymentId: cfPaymentId ?? null,
				updatedAt: new Date(),
			})
			.where(eq(order.cashfreeOrderId, cfOrderId));
	} catch (err) {
		console.error(err);
		return new Response('Failed to update order', { status: 500 });
	}

	return new Response('ok', { status: 200 });
};
