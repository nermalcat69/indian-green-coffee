// Orders live directly in the shared "graycup-orders" D1 database — the same
// database orders-graycup's admin dashboard reads from (binding "DB" there,
// "GRAYCUP_ORDERS_DB" here — see wrangler.jsonc). No separate Postgres store;
// this table is the source of truth for indian-green-coffee's orders.
// Schema: migrations/0001_create_indian_green_coffee_orders.sql

export interface D1Like {
	prepare(query: string): {
		bind(...values: unknown[]): {
			run(): Promise<unknown>;
			first<T = unknown>(): Promise<T | null>;
		};
	};
}

export interface GraycupOrdersEnv {
	GRAYCUP_ORDERS_DB?: D1Like;
}

export type OrderLineItem = {
	slug: string;
	name: string;
	qtyKg: number;
	pricePerKg: number;
	lineTotal: number;
};

export type NewOrder = {
	orderId: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	gstNumber: string | null;
	addressLine1: string;
	addressLine2: string | null;
	city: string;
	state: string;
	pincode: string;
	notes: string | null;
	items: OrderLineItem[];
	subtotal: number;
	total: number;
};

function nowUnixSeconds(): number {
	return Math.floor(Date.now() / 1000);
}

function requireDb(env: GraycupOrdersEnv | undefined): D1Like {
	const db = env?.GRAYCUP_ORDERS_DB;
	if (!db) {
		throw new Error('GRAYCUP_ORDERS_DB is not bound — check wrangler.jsonc d1_databases config');
	}
	return db;
}

export async function insertOrder(env: GraycupOrdersEnv | undefined, order: NewOrder): Promise<void> {
	const db = requireDb(env);
	const now = nowUnixSeconds();
	await db
		.prepare(
			`INSERT INTO indian_green_coffee_orders (
				order_id, customer_name, customer_email, customer_phone, gst_number,
				address_line1, address_line2, city, state, pincode, notes,
				items_json, subtotal_inr, total_inr, status, created_at, updated_at
			) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
		)
		.bind(
			order.orderId,
			order.customerName,
			order.customerEmail,
			order.customerPhone,
			order.gstNumber,
			order.addressLine1,
			order.addressLine2,
			order.city,
			order.state,
			order.pincode,
			order.notes,
			JSON.stringify(order.items),
			order.subtotal,
			order.total,
			'PENDING',
			now,
			now
		)
		.run();
}

export async function attachCashfreeOrderId(
	env: GraycupOrdersEnv | undefined,
	orderId: string,
	cfOrderId: string
): Promise<void> {
	const db = requireDb(env);
	await db
		.prepare(`UPDATE indian_green_coffee_orders SET cashfree_order_id = ?, updated_at = ? WHERE order_id = ?`)
		.bind(cfOrderId, nowUnixSeconds(), orderId)
		.run();
}

export async function updateOrderStatusByOrderId(
	env: GraycupOrdersEnv | undefined,
	orderId: string,
	status: 'PAID' | 'FAILED',
	cfPaymentId: string | null
): Promise<void> {
	const db = requireDb(env);
	await db
		.prepare(
			`UPDATE indian_green_coffee_orders
			 SET status = ?, cashfree_payment_id = COALESCE(?, cashfree_payment_id), updated_at = ?
			 WHERE order_id = ?`
		)
		.bind(status, cfPaymentId, nowUnixSeconds(), orderId)
		.run();
}

export async function updateOrderStatusByCashfreeOrderId(
	env: GraycupOrdersEnv | undefined,
	cfOrderId: string,
	status: 'PAID' | 'FAILED',
	cfPaymentId: string | null
): Promise<void> {
	const db = requireDb(env);
	await db
		.prepare(
			`UPDATE indian_green_coffee_orders
			 SET status = ?, cashfree_payment_id = COALESCE(?, cashfree_payment_id), updated_at = ?
			 WHERE cashfree_order_id = ?`
		)
		.bind(status, cfPaymentId, nowUnixSeconds(), cfOrderId)
		.run();
}

export async function getOrderStatus(env: GraycupOrdersEnv | undefined, orderId: string): Promise<string | null> {
	const db = requireDb(env);
	const row = await db
		.prepare(`SELECT status FROM indian_green_coffee_orders WHERE order_id = ?`)
		.bind(orderId)
		.first<{ status: string }>();
	return row?.status ?? null;
}
