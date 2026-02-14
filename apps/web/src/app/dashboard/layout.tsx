import { MainLayout } from "@/components/layout/main-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar nav — P2-T05 */}
          <aside className="hidden lg:block">
            <nav className="space-y-2 text-sm">
              <p className="font-semibold text-muted-foreground">Dashboard navigatsioon</p>
            </nav>
          </aside>
          <div>{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
