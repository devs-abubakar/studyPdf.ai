import React, { useEffect,useRef, useState } from 'react';
import { ChatInput } from './chat-input';
import { useChatStore } from '@/store/chat-store';
import WelcomeScreen from './chat-welcome';
import markdownit from 'markdown-it';
import { useMessages } from '@/hooks/useMessages';
import ScrollToBottom from './scroll-to-bottom';

export function ChatBox() {
  const activeChat = useChatStore((s) => s.activeChat);
  const currentChat = useChatStore((s) =>
    s.chats.find((c) => c.sessionId === s.activeChat)
  );
  const messages = currentChat?.messages ?? []; 
  const [showBtn,setShowBtn]= useState(false)
  const md = new markdownit({ html: true, breaks: true, linkify: true });
  const chatRef = useRef(null)
  const bottomRef = useRef(null)
  const { loading, error } = useMessages(activeChat);
  
  const handleScroll = () => {
  const el = chatRef.current;
  if (!el) return;

  const threshold = 120;

  const distanceFromBottom =
    el.scrollHeight - el.scrollTop - el.clientHeight;

  const userIsUp = distanceFromBottom > threshold;

  setShowBtn(userIsUp);
};

  function handleToBottom(){
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block:"end"
    })  
  }

  useEffect(() => {
    handleToBottom()
  }, [messages])

  return (
    <div className="relative flex flex-col min-h-0 flex-1 w-full">
      {!activeChat ? (
        <WelcomeScreen />
      ) : (
        <div ref={chatRef} onScroll={handleScroll}  className="absolute inset-0 flex-1 overflow-y-auto pb-36 px-4">
          <div className="mx-auto max-w-3xl py-4 space-y-4">
            
            {/* Displaying from Zustand, capturing both History and Real-Time */}
            {messages.map((msg, id) => {
              const isUser = msg.role === "user";

              return (
                <div key={id} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 break-words ${
                      isUser ? "bg-brand-purple text-white rounded-br-md" : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <div
                      className="text-sm leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: md.render(msg.content ?? ""),
                      }}
                    />

                  </div>
                </div>
              );
            })}
            
            {loading && <div className="text-center text-sm text-gray-500">Loading history...</div>}
            
          </div>

                <div ref={bottomRef} />
        </div>
      )}

      {/* Input Area */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2">
          {showBtn && <ScrollToBottom onClick={handleToBottom}/> }
        <ChatInput />
      </div>
    </div>
  );
}