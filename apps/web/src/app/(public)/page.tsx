import type { Metadata } from "next";
import { HomeSearch } from "@/components/home/home-search";
import { PremiumListings } from "@/components/home/premium-listings";
import { LatestListings } from "@/components/home/latest-listings";
import { AppPromo } from "@/components/home/app-promo";
import { AdSlot } from "@/components/shared/ad-slot";
import { generateWebsiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";



export const metadata: Metadata = {
	title: "Kaarplus | Buy and Sell Cars in Estonia",
	description: "Estonia's largest car marketplace.",
};

export default function HomePage() {
	const websiteJsonLd = generateWebsiteJsonLd();

	return (
		<main className="flex min-h-screen flex-col bg-white dark:bg-black">
			<JsonLd data={websiteJsonLd} />

			{/* 1. Main Search Bar */}
			<HomeSearch />

			{/* Ad: Billboard after search */}
			<AdSlot placementId="HOME_BILLBOARD" className="container px-4 my-6" />

			{/* 2. Premium Listings (VIP) */}
			<PremiumListings />

			{/* 3. Latest Listings (Grid) */}
			<LatestListings />



			<AppPromo />

		</main>
	);
}
