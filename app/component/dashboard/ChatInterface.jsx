import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { ChatInput } from './ChatInput';
import { MessageItem } from './MessageItem';
import { EmptyState } from './EmptyState';
import { Menu, X, Plus } from 'lucide-react';
import { cn } from '@/app/lib/utils/utils';

export const ChatInterface = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  useEffect(() => {
    if (activeSession) {
      setMessages(activeSession.messages);
    } else {
      setMessages([]);
    }
  }, [activeSessionId, sessions]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
  };

  const handleSend = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Create session if it doesn't exist
    let currentSessionId = activeSessionId;
    if (!currentSessionId) {
      currentSessionId = Date.now().toString();
      const newSession= {
        id: currentSessionId,
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: newMessages,
        updatedAt: Date.now()
      };
      setSessions([newSession, ...sessions]);
      setActiveSessionId(currentSessionId);
    } else {
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: [...s.messages, userMessage], updatedAt: Date.now() } 
          : s
      ));
    }

    setIsStreaming(true);
    const assistantMessageId = (Date.now() + 1).toString();
    const initialAssistantMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, initialAssistantMessage]);

    try {
      let fullContent = "";
      await sendMessageStream(newMessages, (chunk) => {
        fullContent += chunk;
        setMessages(prev => prev.map(m => 
          m.id === assistantMessageId ? { ...m, content: fullContent } : m
        ));
      });

      // Update sessions with final content
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { 
              ...s, 
              messages: [
                ...s.messages.filter(m => m.id !== userMessage.id), // Ensure no duplicates if state race
                userMessage,
                { id: assistantMessageId, role: 'assistant', content: fullContent, timestamp: Date.now() }
              ],
              updatedAt: Date.now() 
            } 
          : s
      ));
    } catch (error) {
      console.error("Failed to get assistant response", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex h-screen bg-chat-bg text-text-main overflow-hidden">
      <Sidebar 
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onSelectSession={setActiveSessionId}
        className={cn(!isSidebarOpen && "md:hidden")}
      />
      
      <main className="relative flex-1 flex flex-col h-full bg-chat-bg transition-all duration-300">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border-subtle h-14 bg-chat-bg/80 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-semibold text-text-main">StudyPdf.ai</span>
          <button onClick={handleNewChat} className="p-2 rounded-lg hover:bg-white/5">
            <Plus className="w-6 h-6" />
          </button>
        </header>

        {/* Desktop Branding/Model Selector */}
        <header className="hidden md:flex h-14 items-center justify-between px-6 border-b border-border-subtle bg-chat-bg/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 font-medium text-sm cursor-pointer hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">
            <span className="text-text-main">Gemini 3 Flash</span>
            <X className="w-4 h-4 text-text-muted rotate-45" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSend} />
          ) : (
            <div className="flex flex-col">
              {messages.map((message) => (
                <MessageItem 
                  key={message.id} 
                  message={message} 
                  isStreaming={isStreaming && message.id === messages[messages.length - 1].id && message.role === 'assistant'}
                />
              ))}
              <div ref={messagesEndRef} className="h-40" />
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-chat-bg via-chat-bg/95 to-transparent pt-10">
          <ChatInput onSend={handleSend} disabled={isStreaming} />
        </div>
      </main>
    </div>
  );
};
