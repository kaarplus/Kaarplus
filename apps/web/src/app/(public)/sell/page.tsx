import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Müü oma auto",
  description: "Lisa oma auto müügi kuulutus Kaarplus platvormile.",
};

export default function SellPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Müü oma auto</h1>
      <p className="mt-2 text-muted-foreground">
        Müügiviisard — implementeeritakse P1-T10 ülesandes
      </p>
    </div>
  );
}
