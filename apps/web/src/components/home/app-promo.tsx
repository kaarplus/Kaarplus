"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function AppPromo() {
	const { t } = useTranslation('home');

	return (
		<section className="bg-slate-900 text-white py-16 mt-8">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-3xl font-bold mb-4">{t('promo.title')}</h2>
				<p className="text-slate-300 mb-8 max-w-xl mx-auto">
					{t('promo.description')}
				</p>
				<div className="flex justify-center gap-4">
					<Button variant="secondary" size="lg" className="h-14 px-8 font-bold">
						{t('promo.appStore')}
					</Button>
					<Button variant="secondary" size="lg" className="h-14 px-8 font-bold">
						{t('promo.googlePlay')}
					</Button>
				</div>
			</div>
		</section>
	);
}
