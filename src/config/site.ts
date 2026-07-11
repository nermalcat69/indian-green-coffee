export type SiteLink = {
	href: string;
	label: string;
};

export type EcosystemLink = {
	href: string;
	label: string;
	description: string;
};

export type SiteConfig = {
	name: string;
	title: string;
	description: string;
	siteUrl: string;
	email: string;
	locale: string;
	authorName: string;
	authorRole: string;
	keywords: string[];
	ogImage: string;
	navLinks: SiteLink[];
	extraPages: SiteLink[];
	legalLinks: SiteLink[];
	socialLinks: SiteLink[];
	ecosystemLinks: EcosystemLink[];
};

const defaultSiteUrl = 'https://indiangreencoffee.com';
const envSiteUrl = process.env.SITE_URL ?? process.env.PUBLIC_SITE_URL;
const normalizedSiteUrl = (envSiteUrl || defaultSiteUrl).replace(/\/+$/, '');

export const siteConfig: SiteConfig = {
	name: 'Indian Green Coffee',
	title: 'Indian Green Coffee | Origins, Grades & Wholesale Sourcing Guide',
	description:
		"An origin guide to India's green coffee — Koraput, Halflong, Chikmagalur, and Bababudangiri estates, processing methods, grading, and how to source it wholesale.",
	// Set SITE_URL or PUBLIC_SITE_URL to keep canonicals, robots.txt, and the sitemap aligned in each environment.
	siteUrl: normalizedSiteUrl,
	email: 'office@graycup.org',
	locale: 'en-IN',
	authorName: 'Gray Cup Enterprises Private Limited',
	authorRole: 'Green Coffee Exporter',
	keywords: [
		'Indian green coffee',
		'Indian coffee origins',
		'Koraput coffee',
		'Halflong Assam coffee',
		'Chikmagalur arabica',
		'wholesale green coffee India',
		'green coffee exporter India',
	],
	ogImage: '/og-image.svg',
	navLinks: [
		{ href: '/origins', label: 'Origins' },
		{ href: '/products', label: 'Coffees' },
		{ href: '/about', label: 'About' },
	],
	extraPages: [
		{ href: '/wholesale', label: 'Wholesale Sourcing' },
		{ href: '/site', label: 'Our Sites' },
		{ href: '/cookies', label: 'Cookies' },
		{ href: '/privacy', label: 'Privacy' },
		{ href: '/terms', label: 'Terms' },
		{ href: '/404', label: '404' },
	],
	legalLinks: [
		{ href: '/cookies', label: 'Cookies' },
		{ href: '/privacy', label: 'Privacy' },
		{ href: '/terms', label: 'Terms' },
	],
	socialLinks: [
		{ href: 'https://x.com/TheGrayCup', label: 'X' },
		{ href: 'https://www.linkedin.com/company/gray-cup/', label: 'LinkedIn' },
		{ href: 'https://instagram.com/thegraycup', label: 'Instagram' },
	],
	ecosystemLinks: [
		{
			href: 'https://graycup.org',
			label: 'Gray Cup Enterprises',
			description:
				'The parent company — exporters of Indian green coffee, chai, and CTC tea since 2019.',
		},
		{
			href: 'https://graycup.com',
			label: 'Gray Cup',
			description: 'Brand home for Gray Cup, linking through to our tea, coffee, and company sites.',
		},
		{
			href: 'https://graycup.in',
			label: 'Gray Cup India',
			description: 'Buy Gray Cup tea and coffee direct in India.',
		},
		{
			href: 'https://b2b.graycup.in',
			label: 'Gray Cup B2B',
			description: 'Wholesale ordering portal for distributors and bulk buyers in India.',
		},
		{
			href: 'https://bulkgreencoffee.com',
			label: 'Bulk Green Coffee',
			description: 'Our wholesale sourcing site — quotes, samples, and MOQs for green coffee exports.',
		},
		{
			href: 'https://odishacoffee.com',
			label: 'Odisha Coffee',
			description: "An origin guide to Koraput and the Eastern Ghats, Odisha's tribal-farmed coffee belt.",
		},
		{
			href: 'https://indianroastedcoffee.com',
			label: 'Indian Roasted Coffee',
			description:
				'Single-origin Indian coffee, roasted to order and shipped within 48 hours — from Coorg to Koraput.',
		},
	],
};
