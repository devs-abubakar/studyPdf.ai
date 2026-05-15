
import React from 'react'
import { ChatInput } from './chat-input'
import { useChatStore } from '@/store/chat-store'

export function ChatBox() {
  const recentChats = useChatStore((s)=>s.recentChats)
  const activeChat = useChatStore((s)=>s.activeChat)
  const currentChats = recentChats.find((chat)=>chat.id === activeChat)
  return (
    <div className="flex flex-col h-[98vh] w-full">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {currentChats?.messages.map((message,id) => (
            <div key={id} className="shadow-lg rounded-xl p-2 bg-gray-500">
            <div>{message.content}</div>
            <span>{message.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-white">
        <ChatInput />
      </div>

    </div>
  )
}