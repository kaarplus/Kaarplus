import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Korduma kippuvad küsimused",
};

export default function FaqPage() {
  return (
    <div className="prose">
      <h1>Korduma kippuvad küsimused</h1>
      <p className="text-muted-foreground">
        KKK sisu — implementeeritakse P1-T06 ülesandes
      </p>
    </div>
  );
}
