import type { APIRoute } from 'astro';
import { getOrderStatus, type GraycupOrdersEnv } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ url, locals }) => {
	const orderId = url.searchParams.get('order_id');
	if (!orderId) {
		return new Response(JSON.stringify({ error: 'order_id is required' }), {
			status: 400,
			headers: { 'content-type': 'application/json' },
		});
	}

	try {
		const env = (locals as { runtime?: { env?: GraycupOrdersEnv } }).runtime?.env;
		const status = await getOrderStatus(env, orderId);

		if (!status) {
			return new Response(JSON.stringify({ error: 'Order not found' }), {
				status: 404,
				headers: { 'content-type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ paymentStatus: status.toLowerCase() }), {
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
