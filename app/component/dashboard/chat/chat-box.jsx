import React, { useEffect, useRef, useState } from 'react';
import { ChatInput } from './chat-input';
import { useChatStore } from '@/store/chat-store';
import WelcomeScreen from './chat-welcome';
import markdownit from 'markdown-it';
import markdownitHighlightjs from 'markdown-it-highlightjs';
import 'highlight.js/styles/github-dark.css';
import { useMessages } from '@/hooks/useMessages';
import ScrollToBottom from './scroll-to-bottom';

const md = new markdownit({ 
  html: false,      // XSS safe
  breaks: true, 
  linkify: true,
  typographer: true
}).use(markdownitHighlightjs, { auto: true, code: true })

// open links in new tab
const defaultLinkRender = md.renderer.rules.link_open ||
  function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  tokens[idx].attrSet('target', '_blank')
  tokens[idx].attrSet('rel', 'noopener noreferrer')
  return defaultLinkRender(tokens, idx, options, env, self)
}

export function ChatBox() {
  const activeChat = useChatStore((s) => s.activeChat);
  const currentChat = useChatStore((s) =>
    s.chats.find((c) => c.sessionId === s.activeChat)
  );
  const messages = currentChat?.messages ?? [];
  const [showBtn, setShowBtn] = useState(false);
  const chatRef = useRef(null);
  const bottomRef = useRef(null);
  const { loading, error } = useMessages(activeChat);
  const agentAction = useChatStore((state)=>state.agentAction)

  // temporarily add this just to see output
console.log(md.render("```javascript\nconst x = 1\n```"))

  const handleScroll = () => {
    const el = chatRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowBtn(distanceFromBottom > 120);
  };

  function handleToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  useEffect(() => {
    handleToBottom()
  }, [messages])

  // ✅ inject copy buttons after new messages render
  useEffect(() => {
    const container = chatRef.current
    if (!container) return

    container.querySelectorAll('pre:not([data-has-copy])').forEach((pre) => {
      pre.setAttribute('data-has-copy', 'true')

      const lang = pre.querySelector('code')
        ?.className?.match(/language-(\w+)/)?.[1] ?? 'code'

      const header = document.createElement('div')
      header.className = 'code-block-header'
      header.innerHTML = `
        <span class="code-lang">${lang}</span>
        <button class="copy-btn">Copy</button>
      `
      header.querySelector('.copy-btn').addEventListener('click', () => {
        const code = pre.querySelector('code')?.innerText ?? ''
        navigator.clipboard.writeText(code).then(() => {
          const btn = header.querySelector('.copy-btn')
          btn.textContent = 'Copied!'
          btn.classList.add('copied')
          setTimeout(() => {
            btn.textContent = 'Copy'
            btn.classList.remove('copied')
          }, 2000)
        })
      })

      pre.prepend(header)
    })
  }, [messages])

  return (
    <div className="relative flex flex-col min-h-0 flex-1 w-full">
      {!activeChat ? (
        <WelcomeScreen />
      ) : (
        <div ref={chatRef} onScroll={handleScroll} className="absolute  inset-0 flex-1 overflow-y-auto pb-36 px-4">
          <div className="mx-auto max-w-3xl py-4 space-y-4">

            {messages.map((msg, id) => {
              const isUser = msg.role === "user";
              return (
                <div key={id} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`min-w-0 rounded-2xl px-4 py-3 ${
                    isUser
                      ? "bg-brand-purple max-w-[80%] text-white rounded-br-md"
                      : "bg-transparent max-w-full text-foreground rounded-bl-md"
                  }`}>

                    {isUser ? (
                      <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    ) : (
                      <>
                      {agentAction?`Agent Action : ${agentAction}`:""}
                      <div
                        className="text-sm leading-relaxed ai-message-content"
                        dangerouslySetInnerHTML={{
                          __html: md.render(msg.content ?? ""),
                        }}
                        />
                        </>
                    )}

                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="text-center text-sm text-gray-500">Loading history...</div>
            )}
          </div>

          <div ref={bottomRef} />
        </div>
      )}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2">
        {showBtn && <ScrollToBottom onClick={handleToBottom} />}
        <ChatInput />
      </div>
    </div>
  );
}