"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardShell({ children }) {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">

      {/* top bar */}
      <header className="flex h-14 items-center border-b px-3">
        <SidebarTrigger />
      </header>

      {/* content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

    </main>
  )
}