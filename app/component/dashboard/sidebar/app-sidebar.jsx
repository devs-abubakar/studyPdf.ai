"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

import { SidebarHeaderSection } from "./sidebar-header"
import { SidebarSearch } from "./sidebar-search"
import { RecentChats } from "./recent-chats"
import { ComingSoon } from "./coming-soon"
import { UserProfile } from "./user-profile"

export function AppSidebar() {
  const { state } = useSidebar()

  const collapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderSection collapsed={collapsed} />
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-4 overflow-hidden">
        
        <SidebarSearch collapsed={collapsed} />

        <div className="flex-1 overflow-y-auto px-2">
          <RecentChats collapsed={collapsed} />
        </div>

        <ComingSoon collapsed={collapsed} />

      </SidebarContent>

      <SidebarFooter>
        <UserProfile collapsed={collapsed} />
      </SidebarFooter>
    </Sidebar>
  )
}