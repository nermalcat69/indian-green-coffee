import type { ImageMetadata } from 'astro';
import koraputImage from '../assets/images/origins/koraput.jpg';
import halflongImage from '../assets/images/origins/halflong.jpg';
import chirangTirapImage from '../assets/images/origins/chirang-tirap.webp';
import chikmagalurImage from '../assets/images/origins/chikmagalur-bababudangiri.jpg';

export type Origin = {
	slug: string;
	name: string;
	state: string;
	region: 'East India' | 'North East India' | 'South India';
	accent: 'lime' | 'cyan' | 'lavender' | 'mint';
	elevation: string;
	varieties: string;
	summary: string;
	body: string[];
	productSlugs: string[];
	image: ImageMetadata;
	imageAlt: string;
};

export const origins: Origin[] = [
	{
		slug: 'koraput',
		name: 'Koraput',
		state: 'Odisha',
		region: 'East India',
		accent: 'lime',
		elevation: '900–1,350m',
		varieties: 'Chandragiri, S795, local heirlooms',
		summary:
			'A tribal-farmed plateau in the Eastern Ghats, largely unknown outside India, producing forest-grown Arabica with almost no chemical inputs.',
		body: [
			"Koraput sits at the southern tip of Odisha, where the Eastern Ghats fold into a series of elevated plateaus and forested ridges. Coffee has grown here since the 1950s as a tribal welfare crop, planted under a native forest canopy alongside pepper vines and silver oak rather than on cleared plantation land. Farmers from the Kondh, Gadaba, and Poraja communities tend small holdings of half an acre to two acres, most without access to synthetic fertiliser or irrigation.",
			"That constraint shaped the region's processing style. Natural (sun-dried) is the dominant method — cherries are spread on raised bamboo beds and turned by hand for three to five weeks, since running water for washing stations is scarce in many farm clusters. The result is a heavy-bodied, fruit-forward cup with dark berry and wine-like notes that reads distinctly different from South Indian washed Arabica.",
			"A smaller volume is processed as Honey Sun-Dried (mucilage left on the parchment during drying) and fully washed, both of which trade at a premium for their cleaner, brighter cup profile. Because farms are small and scattered, lots are aggregated at a village level before micro-milling — so traceability runs to district and cooperative, not always to a single farm.",
		],
		productSlugs: ['koraput-naturals', 'koraput-hsd', 'koraput-washed', 'koraput-commercial-aaa'],
		image: koraputImage,
		imageAlt: 'Sun-dried green coffee beans being sorted on a drying mesh in Koraput, Odisha',
	},
	{
		slug: 'halflong',
		name: 'Halflong',
		state: 'Assam',
		region: 'North East India',
		accent: 'cyan',
		elevation: '1,000–1,200m',
		varieties: 'SL-9',
		summary:
			"India's newest specialty frontier — high-altitude SL-9 Arabica from the North Cachar Hills, largely absent from green coffee catalogues a decade ago.",
		body: [
			"Halflong is the headquarters town of the North Cachar Hills, a range that sits well outside the tea-growing lowlands most people associate with Assam. Coffee here is a recent diversification effort for hill farmers who previously grew areca nut and small tea patches, and the plantings are young relative to South India's century-old estates — most are 10 to 20 years old.",
			"The varietal of note is SL-9, a Kenyan-origin selection uncommon in Indian Arabica, grown at 1,000–1,200m under mixed shade. Processing is natural sun-drying on raised beds, and cupping scores from recent lots have run 88–89 SCA — competitive with well-known African and Central American origins, which is unusual for an Indian coffee this far from the established Karnataka–Kerala–Tamil Nadu belt.",
			"Because volumes are still small and the region is not well known internationally, Halflong lots are positioned as a specialty rarity rather than a everyday commercial supply — most orders move in samples and small trial batches before roasters commit to seasonal contracts.",
		],
		productSlugs: ['halflong-arabica-naturals'],
		image: halflongImage,
		imageAlt: 'A farmer hand-picking ripe coffee cherries from a shade-grown Arabica tree in Assam',
	},
	{
		slug: 'chirang-tirap',
		name: 'Chirang & Tirap',
		state: 'Assam / Arunachal Pradesh',
		region: 'North East India',
		accent: 'mint',
		elevation: '300–700m',
		varieties: 'CxR (Robusta hybrid)',
		summary:
			'Lower-elevation Robusta from the Assam–Arunachal border, grown as a smallholder cash crop between tea gardens and forest reserve land.',
		body: [
			"Chirang district in western Assam and Tirap district across the border in Arunachal Pradesh sit at much lower elevation than India's Arabica belts, which makes them naturally suited to Robusta rather than Arabica. Farmers here typically intercrop coffee with areca nut and rubber, treating it as a supplementary income crop rather than the primary one.",
			"CxR — a Robusta hybrid selection — is the dominant planting material, prized locally for consistent yield rather than cup complexity. Cherries are sun-dried using the natural process on tarpaulin or concrete drying yards, since the region lacks the wet-mill infrastructure common in South Indian Robusta zones.",
			"For buyers, this origin fills a specific gap: bold, high-caffeine Robusta for espresso blends and instant coffee manufacturing at a lower price point than South Indian AA/AAA grades, with volumes that scale with the region's growing smallholder base each season.",
		],
		productSlugs: ['chirang-robusta-naturals', 'tirap-robusta-naturals'],
		image: chirangTirapImage,
		imageAlt: 'A labelled sample bag of Chirang, Assam Robusta Naturals green coffee beans',
	},
	{
		slug: 'chikmagalur-bababudangiri',
		name: 'Chikmagalur & Bababudangiri',
		state: 'Karnataka',
		region: 'South India',
		accent: 'lavender',
		elevation: '1,000–1,500m',
		varieties: 'S795, Catuai, SLN 9, local heirlooms',
		summary:
			"The historic birthplace of Indian coffee — legend holds that Sufi saint Baba Budan smuggled seven Arabica seeds here from Yemen in the 1600s.",
		body: [
			'Chikmagalur is where Indian coffee cultivation began, and the Bababudangiri hill range within it is named for the saint credited with introducing Arabica to India centuries before the British established plantation agriculture in the region. The area now hosts a mix of large estates with century-old infrastructure and smallholder farms managed alongside pepper and cardamom.',
			"S795 is the workhorse varietal across most estates, prized for its balance of yield and cup quality, alongside older Catuai plantings and the SLN 9 selection developed specifically for Indian growing conditions. Elevation ranges from 1,000m in the valleys to over 1,500m on the higher estate blocks, giving noticeable cup variation even within a single district.",
			"Both washed and natural processing are common here, unlike Koraput's near-exclusive reliance on naturals — estates with established wet mills run washed lots for a cleaner, more acidic cup, while smaller farms without milling infrastructure sun-dry their cherries. This gives Chikmagalur and Bababudangiri the widest process variety of any Indian origin covered here.",
		],
		productSlugs: ['chikmagalur-arabica', 'bababudangiri-arabica', 'coorg-arabica'],
		image: chikmagalurImage,
		imageAlt: 'Freshly washed coffee cherries being rinsed by hand at a Karnataka estate',
	},
];

export function getOriginBySlug(slug: string): Origin | undefined {
	return origins.find((o) => o.slug === slug);
}
