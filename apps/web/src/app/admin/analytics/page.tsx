import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Analüütika | Kaarplus Admin",
    description: "Platvormi statistika ja ülevaade",
};

export default function AdminAnalyticsPage() {
    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <AnalyticsDashboard />
        </div>
    );
}
