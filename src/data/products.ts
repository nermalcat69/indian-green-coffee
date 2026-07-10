import type { ImageMetadata } from 'astro';
import koraputImage from '../assets/images/products/koraput.png';
import halflongImage from '../assets/images/products/halflong.webp';
import chirangImage from '../assets/images/products/chirang.webp';
import tirapImage from '../assets/images/products/tirap.webp';
import chikmagalurImage from '../assets/images/products/chikmagalur.webp';
import bababudangiriImage from '../assets/images/products/bababudangiri.webp';
import coorgImage from '../assets/images/products/coorg.webp';

export type Product = {
	slug: string;
	name: string;
	originSlug: string;
	variety: 'Arabica' | 'Robusta';
	process: string;
	grade: string;
	varietal: string;
	scaScore?: number;
	priceRange: { min: number; max: number; unit: string };
	minimumOrder: { quantity: number; unit: string };
	accent: 'lime' | 'cyan' | 'lavender' | 'mint';
	summary: string;
	description: string;
	sku: string;
	image: ImageMetadata;
	imageAlt: string;
};

export const products: Product[] = [
	{
		slug: 'koraput-naturals',
		name: 'Koraput Arabica Naturals',
		originSlug: 'koraput',
		variety: 'Arabica',
		process: 'Natural (sun-dried)',
		grade: 'Grade 1 / Grade 2 / Peaberry',
		varietal: 'Chandragiri, local heirlooms',
		scaScore: 87,
		priceRange: { min: 1100, max: 1900, unit: '/kg' },
		minimumOrder: { quantity: 10, unit: 'kg' },
		accent: 'lime',
		summary: 'Forest-grown, sun-dried Arabica from Odisha tribal smallholders — dark berry, wine-like body.',
		description:
			'Sun-dried whole cherry on raised bamboo beds for three to five weeks, producing an intense, fruit-forward cup with heavy body. Aggregated from Kondh, Gadaba, and Poraja smallholder farms across the Koraput plateau.',
		sku: 'IGC-KOR-NAT',
		image: koraputImage,
		imageAlt: 'A bowl of raw green coffee beans from Koraput, Odisha',
	},
	{
		slug: 'koraput-hsd',
		name: 'Koraput Arabica Honey Sun-Dried',
		originSlug: 'koraput',
		variety: 'Arabica',
		process: 'Honey (mucilage-on, sun-dried)',
		grade: 'Grade 1',
		varietal: 'Chandragiri, local heirlooms',
		scaScore: 88,
		priceRange: { min: 1200, max: 2100, unit: '/kg' },
		minimumOrder: { quantity: 10, unit: 'kg' },
		accent: 'lime',
		summary: 'Mucilage-on drying for a cleaner, sweeter cup than Koraput naturals — the region’s top-scoring lot.',
		description:
			'Parchment is dried with the mucilage intact rather than washed off, giving a sweeter, more structured cup than the fully natural lots from the same farms. The highest-scoring processing style currently coming out of Koraput.',
		sku: 'IGC-KOR-HSD',
		image: koraputImage,
		imageAlt: 'A bowl of raw green coffee beans from Koraput, Odisha',
	},
	{
		slug: 'koraput-washed',
		name: 'Koraput Arabica Washed',
		originSlug: 'koraput',
		variety: 'Arabica',
		process: 'Fully washed',
		grade: 'Grade 1 / Grade 2',
		varietal: 'Chandragiri, S795',
		scaScore: 87,
		priceRange: { min: 1100, max: 1900, unit: '/kg' },
		minimumOrder: { quantity: 10, unit: 'kg' },
		accent: 'lime',
		summary: 'A minority processing style in Koraput, run only where farms have access to wet-milling water.',
		description:
			'Fermented and washed where water access allows, producing a cleaner, brighter cup than the region’s dominant natural-process lots — a useful comparison point for buyers evaluating Koraput’s processing range.',
		sku: 'IGC-KOR-WSH',
		image: koraputImage,
		imageAlt: 'A bowl of raw green coffee beans from Koraput, Odisha',
	},
	{
		slug: 'koraput-commercial-aaa',
		name: 'Koraput Arabica AAA (Commercial)',
		originSlug: 'koraput',
		variety: 'Arabica',
		process: 'Natural (sun-dried)',
		grade: 'AAA',
		varietal: 'Chandragiri, local heirlooms',
		priceRange: { min: 830, max: 850, unit: '/kg' },
		minimumOrder: { quantity: 60, unit: 'kg' },
		accent: 'lime',
		summary: 'Commercial-grade screen-sized Koraput Arabica for roasters and blenders working to a price target.',
		description:
			'The same tribal-farmed Koraput naturals, sorted to a commercial AAA screen size rather than cupped for specialty scoring — the entry point for buyers who want Indian origin character without specialty pricing.',
		sku: 'IGC-KOR-AAA',
		image: koraputImage,
		imageAlt: 'A bowl of raw green coffee beans from Koraput, Odisha',
	},
	{
		slug: 'halflong-arabica-naturals',
		name: 'Halflong SL-9 Arabica Naturals',
		originSlug: 'halflong',
		variety: 'Arabica',
		process: 'Natural (sun-dried)',
		grade: 'Specialty',
		varietal: 'SL-9',
		scaScore: 89,
		priceRange: { min: 1750, max: 1750, unit: '/kg' },
		minimumOrder: { quantity: 10, unit: 'kg' },
		accent: 'cyan',
		summary: 'India’s highest-scoring lot on this list — young SL-9 plantings from Assam’s North Cachar Hills.',
		description:
			'Grown at 1,000–1,200m on hill farms recently diversified from areca nut and tea, this SL-9 selection is uncommon in Indian Arabica and consistently the top scorer among our origins. Volumes are still small — most orders move as samples before seasonal contracts.',
		sku: 'IGC-HFL-NAT',
		image: halflongImage,
		imageAlt: 'A bowl of raw green coffee beans from Halflong, Assam',
	},
	{
		slug: 'chirang-robusta-naturals',
		name: 'Chirang Robusta Naturals',
		originSlug: 'chirang-tirap',
		variety: 'Robusta',
		process: 'Natural (sun-dried)',
		grade: 'Commercial',
		varietal: 'CxR hybrid',
		priceRange: { min: 750, max: 1100, unit: '/kg' },
		minimumOrder: { quantity: 60, unit: 'kg' },
		accent: 'mint',
		summary: 'Bold, high-caffeine Robusta from the Assam–Arunachal border, priced for espresso blends and instant coffee.',
		description:
			'Grown as a smallholder cash crop intercropped with areca nut, sun-dried on tarpaulin yards without wet-mill infrastructure. A cost-effective Robusta for blenders and instant coffee manufacturers.',
		sku: 'IGC-CHR-NAT',
		image: chirangImage,
		imageAlt: 'A labelled sample bag of Chirang, Assam Robusta Naturals green coffee beans',
	},
	{
		slug: 'tirap-robusta-naturals',
		name: 'Tirap Robusta Naturals',
		originSlug: 'chirang-tirap',
		variety: 'Robusta',
		process: 'Natural (sun-dried)',
		grade: 'Commercial',
		varietal: 'CxR hybrid',
		priceRange: { min: 800, max: 1200, unit: '/kg' },
		minimumOrder: { quantity: 60, unit: 'kg' },
		accent: 'mint',
		summary: 'Arunachal Pradesh Robusta from the same border belt as Chirang, with slightly higher screen consistency.',
		description:
			'Farmed across the border from Chirang in Arunachal Pradesh under similar low-elevation conditions. Consistent yield-focused CxR plantings make this a dependable bulk Robusta supply.',
		sku: 'IGC-TIR-NAT',
		image: tirapImage,
		imageAlt: 'A labelled sample bag of Tirap, Arunachal Pradesh Robusta Naturals green coffee beans',
	},
	{
		slug: 'chikmagalur-arabica',
		name: 'Chikmagalur Arabica',
		originSlug: 'chikmagalur-bababudangiri',
		variety: 'Arabica',
		process: 'Washed & natural (lot-dependent)',
		grade: 'Plantation A / AA',
		varietal: 'S795, Catuai, SLN 9',
		scaScore: 85,
		priceRange: { min: 950, max: 1700, unit: '/kg' },
		minimumOrder: { quantity: 30, unit: 'kg' },
		accent: 'lavender',
		summary: "Arabica from India's founding coffee district, where cultivation began under Baba Budan's legendary seven seeds.",
		description:
			'Grown across century-old estates and smallholder farms at 1,000–1,500m. Both washed and natural lots are available depending on estate infrastructure — the widest process variety of any origin in this catalogue.',
		sku: 'IGC-CHK-ARB',
		image: chikmagalurImage,
		imageAlt: 'A bowl of raw green coffee beans from Chikmagalur, Karnataka',
	},
	{
		slug: 'bababudangiri-arabica',
		name: 'Bababudangiri Arabica',
		originSlug: 'chikmagalur-bababudangiri',
		variety: 'Arabica',
		process: 'Washed & natural (lot-dependent)',
		grade: 'Plantation A',
		varietal: 'S795, local heirlooms',
		scaScore: 86,
		priceRange: { min: 1200, max: 2200, unit: '/kg' },
		minimumOrder: { quantity: 30, unit: 'kg' },
		accent: 'lavender',
		summary: 'Higher-elevation lots from the Bababudangiri range within Chikmagalur, scoring a point above the district average.',
		description:
			'Sourced from the higher estate blocks of the Bababudangiri hill range, above 1,300m, where cooler temperatures slow cherry maturation and concentrate cup complexity relative to lower Chikmagalur farms.',
		sku: 'IGC-BBG-ARB',
		image: bababudangiriImage,
		imageAlt: 'A bowl of raw green coffee beans from the Bababudangiri hill range, Karnataka',
	},
	{
		slug: 'coorg-arabica',
		name: 'Coorg (Kodagu) Arabica',
		originSlug: 'chikmagalur-bababudangiri',
		variety: 'Arabica',
		process: 'Washed & natural (lot-dependent)',
		grade: 'Plantation A',
		varietal: 'S795, Catuai',
		scaScore: 84,
		priceRange: { min: 900, max: 1600, unit: '/kg' },
		minimumOrder: { quantity: 30, unit: 'kg' },
		accent: 'lavender',
		summary: "Karnataka's other major Arabica district, grown under dense shade alongside pepper and cardamom.",
		description:
			'Coorg (Kodagu) estates run heavier native-tree shade cover than neighbouring Chikmagalur, intercropped with pepper vines and cardamom — a growing style that moderates cup acidity relative to more open-canopy farms.',
		sku: 'IGC-COO-ARB',
		image: coorgImage,
		imageAlt: 'A bowl of raw green coffee beans from Coorg (Kodagu), Karnataka',
	},
];

export function getProductBySlug(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}

export function getProductsByOrigin(originSlug: string): Product[] {
	return products.filter((p) => p.originSlug === originSlug);
}
