import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"


export function SidebarSearch({
  collapsed}) {
  if (collapsed) {
    return (
      <div className="flex justify-center px-2">
        <button className="flex size-9 items-center justify-center rounded-lg hover:bg-accent">
          <Search className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="relative px-2">
      <Search className="absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search chats..."
        className="pl-9"
      />
    </div>
  )
}