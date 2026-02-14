import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detailotsing",
  description: "Täpsusta oma otsingut. Filtreeri kütuse, jõuallikas, varustuse ja palju muu järgi.",
};

export default function AdvancedSearchPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Detailotsing</h1>
      <p className="mt-2 text-muted-foreground">
        Detailotsing — implementeeritakse P2-T03 ülesandes
      </p>
    </div>
  );
}
