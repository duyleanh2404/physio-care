import { AppSidebar } from "@/components/admin/AppSidebar";
import { SiteHeader } from "@/components/admin/SiteHeader";
import { AdminGuard } from "@/components/guards/AdminGuard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset className="px-4">{children}</SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </AdminGuard>
  );
}
