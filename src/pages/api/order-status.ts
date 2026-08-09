import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb, order } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
	const orderId = url.searchParams.get('order_id');
	if (!orderId) {
		return new Response(JSON.stringify({ error: 'order_id is required' }), {
			status: 400,
			headers: { 'content-type': 'application/json' },
		});
	}

	try {
		const db = getDb();
		const [row] = await db
			.select({ paymentStatus: order.paymentStatus })
			.from(order)
			.where(eq(order.id, orderId))
			.limit(1);

		if (!row) {
			return new Response(JSON.stringify({ error: 'Order not found' }), {
				status: 404,
				headers: { 'content-type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ paymentStatus: row.paymentStatus }), {
			status: 200,
			headers: { 'content-type': 'application/json' },
		});
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'content-type': 'application/json' },
		});
	}
};
