import { products } from '../data/products';
import { siteConfig } from '../config/site';

export function GET() {
	const baseUrl = siteConfig.siteUrl;

	const body = {
		site: 'indiangreencoffee.com',
		baseUrl,
		currency: 'INR',
		generatedAt: new Date().toISOString(),
		products: products.map((product) => ({
			sku: product.sku,
			slug: product.slug,
			name: product.name,
			originSlug: product.originSlug,
			variety: product.variety,
			process: product.process,
			grade: product.grade,
			varietal: product.varietal,
			scaScore: product.scaScore ?? null,
			description: product.description,
			summary: product.summary,
			url: `${baseUrl}/products/${product.slug}`,
			image: `${baseUrl}${product.image.src}`,
			imageAlt: product.imageAlt,
			currency: 'INR',
			priceRange: product.priceRange,
			minimumOrder: product.minimumOrder,
		})),
	};

	return new Response(JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
			'Access-Control-Allow-Origin': '*',
		},
	});
}
