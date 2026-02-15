import type { Metadata } from "next";
import { ListingsManagement } from "@/components/dashboard/listings-management";

export const metadata: Metadata = {
  title: "Minu kuulutused | Kaarplus",
  description: "Halda oma sõidukite kuulutusi",
};

export default function DashboardListingsPage() {
  return <ListingsManagement />;
}
