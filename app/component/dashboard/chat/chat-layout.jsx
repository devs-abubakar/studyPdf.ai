"use client"
import { ChatArea } from "./chat-area"
import { ChatBox } from "./chat-box"

export function ChatLayout() {
  return (
    <div className="flex max-h-screen flex-col">
      <ChatArea />
      <ChatBox/>
    </div>
  )
}