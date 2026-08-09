export type CartItem = {
	slug: string;
	qtyKg: number;
};

const STORAGE_KEY = 'igc_cart';
const CHANGE_EVENT = 'cart:change';

function readRaw(): CartItem[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(
			(item): item is CartItem =>
				item && typeof item.slug === 'string' && typeof item.qtyKg === 'number' && item.qtyKg > 0
		);
	} catch {
		return [];
	}
}

function writeRaw(items: CartItem[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { items } }));
}

export function getCart(): CartItem[] {
	return readRaw();
}

export function addItem(slug: string, qtyKg: number): CartItem[] {
	const items = readRaw();
	const existing = items.find((item) => item.slug === slug);
	if (existing) {
		existing.qtyKg = qtyKg;
	} else {
		items.push({ slug, qtyKg });
	}
	writeRaw(items);
	return items;
}

export function updateQty(slug: string, qtyKg: number): CartItem[] {
	const items = readRaw()
		.map((item) => (item.slug === slug ? { ...item, qtyKg } : item))
		.filter((item) => item.qtyKg > 0);
	writeRaw(items);
	return items;
}

export function removeItem(slug: string): CartItem[] {
	const items = readRaw().filter((item) => item.slug !== slug);
	writeRaw(items);
	return items;
}

export function clearCart(): void {
	writeRaw([]);
}

export function cartCount(): number {
	return readRaw().length;
}

export const CART_CHANGE_EVENT = CHANGE_EVENT;
export const CART_STORAGE_KEY = STORAGE_KEY;
