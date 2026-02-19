import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspections | Kaarplus",
  description: "Inspections page for Kaarplus",
};

export default function Page() {
  return (
    <div className="container py-16 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Inspections</h1>
      <p className="text-slate-600 dark:text-slate-400">
        This page is currently under construction. Please check back later.
      </p>
    </div>
  );
}
