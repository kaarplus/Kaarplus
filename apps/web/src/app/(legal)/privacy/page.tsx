import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privaatsuspoliitika",
};

export default function PrivacyPage() {
  return (
    <div className="prose">
      <h1>Privaatsuspoliitika</h1>
      <p className="text-muted-foreground">
        Privaatsuspoliitika sisu — implementeeritakse P1-T14 ülesandes
      </p>
    </div>
  );
}
