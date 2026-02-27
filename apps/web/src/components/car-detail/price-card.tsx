"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, MessageCircle } from "lucide-react";
import { PriceDisplay } from "@/components/shared/price-display";
import { ShareButton } from "@/components/shared/share-button";
import { ContactSellerDialog } from "@/components/car-detail/contact-seller-dialog";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface PriceCardProps {
	listingId: string;
	listingTitle: string;
	price: number;
	includeVat: boolean;
	status?: string;
	isFavorited?: boolean;
	sellerPhone?: string | null;
	sellerName?: string | null;
}

export function PriceCard({
	listingId,
	listingTitle,
	price,
	includeVat,
	status,
	isFavorited: initialIsFavorited,
	sellerPhone,
	sellerName,
}: PriceCardProps) {
	const { t } = useTranslation('carDetail');
	const { toast } = useToast();
	const { data: session } = useSession();
	const isAuthenticated = !!session;

	const { favoriteIds, toggleFavorite, loadFavorites, isLoaded } = useFavoritesStore();
	const isFavorited = favoriteIds.has(listingId);

	// Load favorites on mount only when authenticated
	useEffect(() => {
		if (isAuthenticated && !isLoaded) {
			loadFavorites();
		}
	}, [isAuthenticated, isLoaded, loadFavorites]);

	const handleToggleFavorite = async () => {
		if (!isAuthenticated) {
			toast({
				title: t("favorites.loginRequired"),
				description: t("favorites.loginRequiredDesc"),
				variant: "destructive",
			});
			return;
		}

		try {
			await toggleFavorite(listingId);

			toast({
				title: isFavorited ? t("favorites.removed") : t("favorites.added"),
				description: isFavorited ? t("favorites.removedDesc") : t("favorites.addedDesc"),
			});
		} catch (error) {
			toast({
				title: t("favorites.error"),
				description: error instanceof Error ? error.message : t("favorites.error"),
				variant: "destructive",
			});
		}
	};

	const shareUrl = `/listings/${listingId}`;

	// Format phone number for tel: link
	const formatPhoneForCall = (phone: string): string => {
		// Remove all non-numeric characters
		const cleaned = phone.replace(/\D/g, '');
		// Add Estonia country code if not present
		if (cleaned.startsWith('5') && cleaned.length === 7 || cleaned.length === 8) {
			return `+372${cleaned}`;
		}
		return `+${cleaned}`;
	};

	const handleCallClick = () => {
		if (!sellerPhone) {
			toast({
				title: t('contactSeller.noPhone'),
				description: t('contactSeller.noPhoneDesc'),
				variant: "destructive",
			});
		}
	};

	return (
		<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
			<div className="flex items-start justify-between">
				<div>
					<Badge className="bg-primary/10 text-primary border-primary/20 uppercase text-[10px] font-bold tracking-wider px-2 py-0.5">
						{status === "ACTIVE" ? t('priceCard.available') : t('priceCard.status', { status })}
					</Badge>
					<div className="mt-2">
						<PriceDisplay price={price} includeVat={includeVat} size="lg" />
						<p className="text-[10px] text-slate-500 uppercase mt-1">
							{includeVat ? t('priceCard.withVat') : t('priceCard.withoutVat')}
						</p>
					</div>
				</div>
			</div>

			{/* Seller Info */}
			{sellerName && (
				<div className="text-sm text-slate-600 dark:text-slate-400">
					<span className="font-medium">{t('priceCard.seller')}:</span> {sellerName}
				</div>
			)}

			{/* Contact Actions */}
			<div className="space-y-3">
				{/* Call Button */}
				{sellerPhone ? (
					<Button
						asChild
						className="w-full h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 gap-2 rounded-xl text-white"
						onClick={handleCallClick}
					>
						<a href={`tel:${formatPhoneForCall(sellerPhone)}`}>
							<Phone size={18} /> {t('priceCard.callSeller')} {sellerPhone}
						</a>
					</Button>
				) : (
					<Button
						disabled
						className="w-full h-12 font-bold gap-2 rounded-xl"
						variant="outline"
					>
						<Phone size={18} /> {t('priceCard.noPhone')}
					</Button>
				)}

				{/* Message Button */}
				<ContactSellerDialog
					listingId={listingId}
					listingTitle={listingTitle}
					triggerButton={
						<Button
							className="w-full h-12 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2 rounded-xl text-white"
						>
							<MessageCircle size={18} /> {t('priceCard.messageSeller')}
						</Button>
					}
				/>
			</div>

			<div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
				<ShareButton
					title={listingTitle}
					url={shareUrl}
					description={t('share.listingDescription', { title: listingTitle })}
					variant="outline"
					className="flex-1 h-10 text-xs font-semibold border-slate-200 dark:border-slate-800 rounded-lg"
					showLabel={true}
				/>
				<Button
					variant="outline"
					className={cn(
						"flex-1 gap-2 text-xs font-semibold h-10 border-slate-200 dark:border-slate-800 rounded-lg transition-colors",
						isFavorited && "border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-900 dark:bg-red-950"
					)}
					onClick={handleToggleFavorite}
				>
					<Heart
						size={16}
						className={cn(
							"transition-all",
							isFavorited && "fill-red-500 text-red-500 scale-110"
						)}
					/>
					{isFavorited ? t('priceCard.saved') : t('priceCard.save')}
				</Button>
			</div>
		</div>
	);
}
