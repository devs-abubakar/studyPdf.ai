import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChatStore } from "@/store/chat-store"

export function SidebarHeaderSection({
  collapsed}){
    const createNewChat = useChatStore((s)=>s.createNewChat)
    
  function handleClick(){
      console.log("new message created")
      createNewChat()
  }
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
        className="shrink-0 rounded-full"
        onClick={handleClick}

      >
        <Plus className="size-4" />
      </Button>
    </div>
  )
}