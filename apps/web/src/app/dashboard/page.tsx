import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const metadata: Metadata = {
  title: "Töölaud | Kaarplus",
  description: "Halda oma kuulutusi, vaata statistikat ja seadeid",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
