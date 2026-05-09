import { ChatItem } from "./chat-item"

const chats = [
  {
    id: 1,
    title: "React State Management",
  },
  {
    id: 2,
    title: "AI Agent Architecture",
  },
  {
    id: 3,
    title: "Three.js Planet App",
  },
]

export function RecentChats() {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">
        Recent Chats
      </h3>

      <div className="space-y-1">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            title={chat.title}
          />
        ))}
      </div>
    </div>
  )
}