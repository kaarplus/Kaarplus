import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autod müügis",
  description: "Sirvi autode kuulutusi. Filtreeri margi, mudeli, hinna ja muu järgi.",
};

export default function CarsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Autod müügis</h1>
      <p className="mt-2 text-muted-foreground">
        Kuulutuste loend — implementeeritakse P1-T08 ülesandes
      </p>
    </div>
  );
}
