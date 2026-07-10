export type SiteLink = {
	href: string;
	label: string;
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
};
