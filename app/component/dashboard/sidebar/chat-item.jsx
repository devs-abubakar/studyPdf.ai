import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatItem({
  title,onClick,active}){
  return (
    <Button
      variant={active? "secondary" : "ghost"}
      className="w-full justify-start"
      onClick={onClick}
    >
      <MessageSquare className="size-4" />

      <span className="truncate">
        {title}
      </span>
    </Button>
  )
}