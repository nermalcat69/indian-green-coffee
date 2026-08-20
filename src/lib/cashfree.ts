import crypto from 'node:crypto';

// Read from process.env, not import.meta.env — Vite/Astro statically inlines
// import.meta.env.X at build time, but these are runtime Cloudflare Worker
// secrets (set via `wrangler secret put`). nodejs_compat_populate_process_env
// (on by default for this project's compatibility_date) bridges Worker
// vars/secrets into process.env at runtime, matching indian-roasted-coffee.
function isSandbox(): boolean {
	return (process.env.CASHFREE_ENV ?? 'sandbox') === 'sandbox';
}

function baseUrl(): string {
	return isSandbox() ? 'https://sandbox.cashfree.com/pg' : 'https://api.cashfree.com/pg';
}

function requireCredentials(): { appId: string; secretKey: string } {
	const appId = process.env.CASHFREE_APP_ID;
	const secretKey = process.env.CASHFREE_SECRET_KEY;
	if (!appId || !secretKey) {
		throw new Error('CASHFREE_APP_ID or CASHFREE_SECRET_KEY is not set');
	}
	return { appId, secretKey };
}

export type CashfreeCustomer = {
	customerId: string;
	name: string;
	email: string;
	phone: string;
};

export type CreateCashfreeOrderResult = {
	cfOrderId: string;
	paymentSessionId: string;
};

export async function createCashfreeOrder(params: {
	orderId: string;
	amount: number;
	customer: CashfreeCustomer;
	returnUrl: string;
	notifyUrl: string;
}): Promise<CreateCashfreeOrderResult> {
	const { appId, secretKey } = requireCredentials();

	const res = await fetch(`${baseUrl()}/orders`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			'x-client-id': appId,
			'x-client-secret': secretKey,
			'x-api-version': '2023-08-01',
		},
		body: JSON.stringify({
			order_id: params.orderId,
			order_amount: params.amount,
			order_currency: 'INR',
			customer_details: {
				customer_id: params.customer.customerId,
				customer_name: params.customer.name,
				customer_email: params.customer.email,
				customer_phone: params.customer.phone,
			},
			order_meta: {
				return_url: params.returnUrl,
				notify_url: params.notifyUrl,
			},
		}),
	});

	const data = await res.json();
	if (!res.ok) {
		throw new Error(data?.message ?? `Cashfree order creation failed (${res.status})`);
	}

	return { cfOrderId: data.order_id, paymentSessionId: data.payment_session_id };
}

export async function getCashfreeOrderStatus(orderId: string): Promise<string> {
	const { appId, secretKey } = requireCredentials();

	const res = await fetch(`${baseUrl()}/orders/${encodeURIComponent(orderId)}`, {
		headers: {
			accept: 'application/json',
			'x-client-id': appId,
			'x-client-secret': secretKey,
			'x-api-version': '2023-08-01',
		},
	});

	const data = await res.json();
	if (!res.ok) {
		throw new Error(data?.message ?? `Cashfree order lookup failed (${res.status})`);
	}

	return data.order_status as string;
}

export function verifyCashfreeWebhookSignature(
	rawBody: string,
	signature: string,
	timestamp: string
): boolean {
	const { secretKey } = requireCredentials();
	const expected = crypto
		.createHmac('sha256', secretKey)
		.update(timestamp + rawBody)
		.digest('base64');

	const expectedBuf = Buffer.from(expected);
	const signatureBuf = Buffer.from(signature);
	if (expectedBuf.length !== signatureBuf.length) return false;
	return crypto.timingSafeEqual(expectedBuf, signatureBuf);
}
