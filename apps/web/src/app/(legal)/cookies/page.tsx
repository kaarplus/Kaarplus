"use client";

import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Cookie,
	Shield,
	BarChart3,
	Share2,
	Settings,
	Mail,
	Info
} from "lucide-react";

interface CookieRow {
	name: string;
	purpose: string;
	validity: string;
}

export default function CookiesPage() {
	const { t } = useTranslation('legal');

	const renderTable = (sectionKey: string) => {
		const headers = {
			cookie: t(`cookiesPolicy.sections.${sectionKey}.table.cookie`),
			purpose: t(`cookiesPolicy.sections.${sectionKey}.table.purpose`),
			validity: t(`cookiesPolicy.sections.${sectionKey}.table.validity`),
		};
		const rows = t(`cookiesPolicy.sections.${sectionKey}.table.rows`, { returnObjects: true }) as CookieRow[];

		if (!rows || !Array.isArray(rows)) return null;

		return (
			<div className="mt-4 rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[200px]">{headers.cookie}</TableHead>
							<TableHead>{headers.purpose}</TableHead>
							<TableHead className="w-[150px]">{headers.validity}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								<TableCell className="font-mono text-xs">{row.name}</TableCell>
								<TableCell>{row.purpose}</TableCell>
								<TableCell>{row.validity}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8 pb-12">
			<header className="text-center space-y-4">
				<div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2">
					<Cookie className="h-10 w-10 text-primary" />
				</div>
				<h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
					{t('cookiesPolicy.title')}
				</h1>
				<p className="text-muted-foreground text-lg">
					{t('cookiesPolicy.effectiveDate')}
				</p>
				<Separator className="max-w-xs mx-auto" />
			</header>

			<div className="grid gap-6">
				{/* 1. What are cookies? */}
				<Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20">
							<Info className="h-6 w-6 text-blue-500" />
						</div>
						<CardTitle className="text-xl font-bold">{t('cookiesPolicy.sections.whatAreCookies.title')}</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 px-6 md:px-10">
						<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
							{t('cookiesPolicy.sections.whatAreCookies.content')}
						</p>
					</CardContent>
				</Card>

				{/* 2. Necessary Cookies */}
				<Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20">
							<Shield className="h-6 w-6 text-green-500" />
						</div>
						<CardTitle className="text-xl font-bold">{t('cookiesPolicy.sections.necessary.title')}</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 px-6 md:px-10">
						<p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
							{t('cookiesPolicy.sections.necessary.description')}
						</p>
						{renderTable('necessary')}
					</CardContent>
				</Card>

				{/* 3. Analytical Cookies */}
				<Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
							<BarChart3 className="h-6 w-6 text-purple-500" />
						</div>
						<CardTitle className="text-xl font-bold">{t('cookiesPolicy.sections.analytical.title')}</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 px-6 md:px-10">
						<p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
							{t('cookiesPolicy.sections.analytical.description')}
						</p>
						{renderTable('analytical')}
					</CardContent>
				</Card>

				{/* 4. Marketing Cookies */}
				<Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-900/20">
							<Share2 className="h-6 w-6 text-pink-500" />
						</div>
						<CardTitle className="text-xl font-bold">{t('cookiesPolicy.sections.marketing.title')}</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 px-6 md:px-10">
						<p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
							{t('cookiesPolicy.sections.marketing.description')}
						</p>
						{renderTable('marketing')}
					</CardContent>
				</Card>

				{/* 5. Managing Cookies */}
				<Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-900/20">
							<Settings className="h-6 w-6 text-orange-500" />
						</div>
						<CardTitle className="text-xl font-bold">{t('cookiesPolicy.sections.management.title')}</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 px-6 md:px-10">
						<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
							{t('cookiesPolicy.sections.management.content')}
						</p>
					</CardContent>
				</Card>

				{/* 6. Contact */}
				<Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
							<Mail className="h-6 w-6 text-slate-500" />
						</div>
						<CardTitle className="text-xl font-bold">{t('cookiesPolicy.sections.contact.title')}</CardTitle>
					</CardHeader>
					<CardContent className="pt-4 px-6 md:px-10">
						<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
							{t('cookiesPolicy.sections.contact.content')}{" "}
							<a href="mailto:privacy@kaarplus.ee" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
								privacy@kaarplus.ee
							</a>
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
