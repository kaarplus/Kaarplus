import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Töölaud",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Töölaud</h1>
      <p className="mt-2 text-muted-foreground">
        Dashboard — implementeeritakse P2-T05 ülesandes
      </p>
    </div>
  );
}
