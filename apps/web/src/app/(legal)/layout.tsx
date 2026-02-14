import { MainLayout } from "@/components/layout/main-layout";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="container max-w-3xl py-12">
        {children}
      </div>
    </MainLayout>
  );
}
