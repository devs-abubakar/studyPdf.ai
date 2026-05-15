
import React from 'react'
import { ChatInput } from './chat-input'
import { useChatStore } from '@/store/chat-store'
import WelcomeScreen from './chat-welcome'

export function ChatBox() {
  const messages = useChatStore((s)=>s.messages)
  const activeChat = useChatStore((s)=>s.activeChat)
  return (
    <div className="relative flex flex-col min-h-0 flex-1 w-full">
      
      {/* Messages Area */}
      {!activeChat?
        <WelcomeScreen/>
      :<div className="absolute inset-0 flex-1 overflow-y-auto pb-36 px-4">
        <div className="mx-auto max-w-3xl py-4 space-y-4">
          {messages?.map((message, id) => {
  const isUser = message.role === "user"

  return (
    <div
      key={id}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3 break-words
          ${isUser
            ? "bg-brand-purple text-white rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
          }
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  )
})}

        </div>
      </div>}

      {/* Input Area */}
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2">
        <ChatInput />
      </div>
    </div>
  )
}