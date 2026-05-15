import { ChatItem } from "./chat-item"
import {useChatStore} from "@/store/chat-store"



export function RecentChats({collapsed}) {
  const activeChat = useChatStore((s)=>s.activeChat)
  const setActiveChat = useChatStore((s)=>s.setActiveChat)
  const chats= useChatStore((s)=>s.recentChats)
  function handleClick(id){
    console.log("opening the chat with id : ",id)
    setActiveChat(id)
  }
  if (!collapsed){return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">
        Recent Chats
      </h3>

      <div className="space-y-1">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            title={chat.title}
            onClick={()=>handleClick(chat.id)}
            active = {activeChat == chat.id}
          />
        ))}
      </div>
    </div>
  )
}}