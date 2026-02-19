"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface ListingSectionProps {
	title: string;
	href?: string;
	children: React.ReactNode;
	className?: string;
	gridClassName?: string;
}

export function ListingSection({ 
	title, 
	href, 
	children, 
	className, 
	gridClassName,
}: ListingSectionProps) {
	const { t } = useTranslation("home");

	return (
		<section className={cn("py-8", className)}>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-lg font-bold uppercase tracking-wide text-slate-900 dark:text-white border-l-4 border-primary pl-3">
						{title}
					</h2>
					{href && (
						<Link
							href={href}
							className="text-sm font-medium text-primary hover:text-primary/80 flex items-center transition-colors"
						>
							{t("listings.viewAll", { defaultValue: "View all" })} <ChevronRight size={16} />
						</Link>
					)}
				</div>

				<div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6", gridClassName)}>
					{children}
				</div>
			</div>
		</section>
	);
}
