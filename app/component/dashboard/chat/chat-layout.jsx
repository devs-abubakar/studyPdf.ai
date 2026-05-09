import { ChatArea } from "./chat-area"
import { ChatInput } from "./chat-input"

export function ChatLayout() {
  return (
    <div className="flex max-h-screen flex-col">
      <ChatArea />
      <ChatInput />
    </div>
  )
}