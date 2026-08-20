-- Orders for indian-green-coffee, in the shared "graycup-orders" D1 database
-- (same database orders-graycup's admin dashboard reads from, binding "DB" there,
-- "GRAYCUP_ORDERS_DB" here). This is the primary orders table for this site.
CREATE TABLE IF NOT EXISTS indian_green_coffee_orders (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	order_id TEXT UNIQUE NOT NULL,
	cashfree_order_id TEXT,
	cashfree_payment_id TEXT,
	customer_name TEXT NOT NULL,
	customer_email TEXT NOT NULL,
	customer_phone TEXT NOT NULL,
	gst_number TEXT,
	address_line1 TEXT NOT NULL,
	address_line2 TEXT,
	city TEXT NOT NULL,
	state TEXT NOT NULL,
	pincode TEXT NOT NULL,
	notes TEXT,
	items_json TEXT NOT NULL,
	subtotal_inr REAL NOT NULL,
	total_inr REAL NOT NULL,
	status TEXT NOT NULL DEFAULT 'PENDING',
	created_at INTEGER NOT NULL,
	updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_igc_orders_cashfree_order_id
	ON indian_green_coffee_orders (cashfree_order_id);
