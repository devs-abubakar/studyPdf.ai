import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"


export function SidebarHeaderSection({
  collapsed}){
  return (
    <div
      className={`flex items-center gap-2 px-2 ${
        collapsed
          ? "justify-center"
          : "justify-between"
      }`}
    >
      {!collapsed && (
        <h2 className="text-lg font-semibold">
          AI Chat
        </h2>
      )}

      <Button
        size="icon"
        className="shrink-0"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}