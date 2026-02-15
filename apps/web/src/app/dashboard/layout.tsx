import { MainLayout } from "@/components/layout/main-layout";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <div className="hidden lg:block">
            <DashboardSidebar />
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
