import type { Metadata } from "next";
import { SettingsPage } from "@/components/dashboard/settings-page";

export const metadata: Metadata = {
  title: "Seaded | Kaarplus",
  description: "Halda oma profiili ja eelistusi",
};

export default function DashboardSettingsPage() {
  return <SettingsPage />;
}
