import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaarplus — Autode ost ja müük Eestis",
  description:
    "Eesti suurim autode ost-müügi platvorm. Leia oma unistuste auto! Kasutatud ja uued autod müügis.",
};

export default function HomePage() {
  return (
    <div className="container py-12">
      {/* Hero section — P1-T06 */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Leia oma unistuste{" "}
          <span className="text-primary">auto</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Eesti suurim autode ost-müügi platvorm. Tuhandeid autosid igapäevaselt.
        </p>
      </section>

      {/* Search bar placeholder — P1-T06 */}
      <section className="mx-auto max-w-4xl rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-center text-muted-foreground">
          Otsinguriba — implementeeritakse P1-T06 ülesandes
        </p>
      </section>
    </div>
  );
}
