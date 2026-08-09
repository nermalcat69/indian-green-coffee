import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { boolean, jsonb, numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// ─── Shared retail database — mirrors orders-graycup's `order` table exactly ──
// orders-graycup (lib/db/schema.ts, exported as `storefrontOrder`) and
// graycup-in-storefront both read/write this same physical table. Column names,
// types, and defaults here MUST stay in lockstep with that file so rows created
// here show up correctly in the orders-graycup admin dashboard.
export const order = pgTable('order', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id'),
	addressSnapshot: jsonb('address_snapshot').notNull(),
	items: jsonb('items').notNull(),
	subtotal: numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
	deliveryCharge: numeric('delivery_charge', { precision: 10, scale: 2 }).notNull().default('0'),
	totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
	paymentStatus: text('payment_status').notNull().default('pending'),
	cashfreeOrderId: text('cashfree_order_id').unique(),
	cashfreePaymentId: text('cashfree_payment_id'),
	gstNumber: text('gst_number'),
	customerName: text('customer_name').notNull().default(''),
	customerEmail: text('customer_email').notNull().default(''),
	customerPhone: text('customer_phone').notNull().default(''),
	delhiveryTrackingId: text('delhivery_tracking_id'),
	isFulfilled: boolean('is_fulfilled').notNull().default(false),
	carrier: text('carrier'),
	shadowfaxRequestId: text('shadowfax_request_id'),
	delhiveryPickupDate: text('delhivery_pickup_date'),
	dispatchStatus: text('dispatch_status'),
	notes: text('notes'),
	couponCode: text('coupon_code'),
	discountAmount: numeric('discount_amount', { precision: 10, scale: 2 }).notNull().default('0'),
	couponUsageCounted: boolean('coupon_usage_counted').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const schema = { order };

// ─── Lazy singleton connection (same pattern as orders-graycup/lib/db/index.ts) ──

let _client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
	if (!_db) {
		const url = import.meta.env.DATABASE_URL;
		if (!url) throw new Error('DATABASE_URL is not set');
		_client = postgres(url, { max: 5, idle_timeout: 20, connect_timeout: 10 });
		_db = drizzle(_client, { schema });
	}
	return _db;
}
