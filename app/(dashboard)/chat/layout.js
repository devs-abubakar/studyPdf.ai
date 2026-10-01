import "@/app/globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/component/dashboard/sidebar/app-sidebar"
import { DashboardShell } from "@/app/component/dashboard/shell/dashboard-shell"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <DashboardShell>{children}</DashboardShell>
      </div>
    </SidebarProvider>
  )
}