import {Search} from "lucide-react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {useChatStore} from "@/store/chat-store"


export function SidebarSearch({
                                  collapsed
                              }) {
    const searchQuery = useChatStore((s) => s.searchQuery)
    const setSearchQuery = useChatStore((s) => s.setSearchQuery)

    if (collapsed) {
        return (
            <div className={"w-full flex justify-center"}>
            <Button size={"icon-lg"} variant={"secondary"}>
                <Search/>
            </Button>
            </div>
        )
    }

    return (
        <div className="relative px-2">
            <Search className="absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/>

            <Input
                placeholder="Search chats..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}