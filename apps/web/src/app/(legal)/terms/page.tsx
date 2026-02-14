import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kasutustingimused",
};

export default function TermsPage() {
  return (
    <div className="prose">
      <h1>Kasutustingimused</h1>
      <p className="text-muted-foreground">
        Kasutustingimuste sisu — implementeeritakse P1-T14 ülesandes
      </p>
    </div>
  );
}
