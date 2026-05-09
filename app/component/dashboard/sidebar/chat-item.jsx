import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatItem({
  title,}){
  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
    >
      <MessageSquare className="size-4" />

      <span className="truncate">
        {title}
      </span>
    </Button>
  )
}