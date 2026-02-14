import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Võrdle autosid",
  description: "Võrdle kuni 4 autot kõrvuti. Vaata spetsifikatsioone ja varustust.",
};

export default function ComparePage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Võrdle autosid</h1>
      <p className="mt-2 text-muted-foreground">
        Võrdlustabel — implementeeritakse P2-T02 ülesandes
      </p>
    </div>
  );
}
