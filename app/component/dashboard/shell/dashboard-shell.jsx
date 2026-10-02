"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import {Badge} from "@/components/ui/badge";

export function DashboardShell({ children }) {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">

      {/* top bar */}
      <header className="flex h-14 items-center justify-between border-b px-3">
        <SidebarTrigger className="rounded-full" />
          <p className={"text-md font-medium"}>The AI</p>
          <Badge className={"bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"}>Free Plan</Badge>
      </header>

      {/* content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

    </main>
  )
}