import {Plus} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useChatStore} from "@/store/chat-store"

export function SidebarHeaderSection({
                                         collapsed
                                     }) {
    const createNewChat = useChatStore((s) => s.createNewChat)

    function handleClick() {
        console.log("new message created")
        let sessionId = crypto.randomUUID()
        createNewChat(sessionId, "untitled")
    }

    return (
        <div
            className={`flex items-center gap-2 ${
                collapsed
                    ? "justify-center"
                    : "justify-between"
            }`}
        >
            <Button
                className="shrink-0 rounded-lg w-full min-w-10"
                onClick={handleClick}
                size={collapsed? "icon-lg" : "lg"}
            >
                <Plus className="size-4"/>
                {!collapsed && "New Chat"}
            </Button>
        </div>
    )
}