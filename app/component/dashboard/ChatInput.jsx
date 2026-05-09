import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Globe, Plus, ArrowUp } from 'lucide-react';
import { cn } from '@/app/lib/utils/utils';


export const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4">
      <div className="relative flex flex-col p-2 bg-[#212121] border border-border-input rounded-2xl chat-input-shadow focus-within:border-[#555] transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Nexus AI..."
          className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-4 max-h-[200px] text-text-main placeholder:text-text-muted leading-relaxed scrollbar-hide text-base"
          rows={1}
          disabled={disabled}
        />
        
        <div className="flex items-center justify-between px-2 pb-1">
          <div className="flex gap-1">
            <button className="p-2 text-text-dim hover:bg-white/5 rounded-lg transition-colors" title="Attach">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 text-text-dim hover:bg-white/5 rounded-lg transition-colors" title="Search the web">
              <Globe className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              input.trim() && !disabled
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-white/10 text-white/20"
            )}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-center text-text-muted">
        Nexus AI can make mistakes. Check important info.
      </p>
    </div>
  );
};
