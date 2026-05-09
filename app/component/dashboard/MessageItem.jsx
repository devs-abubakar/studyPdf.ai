import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { cn } from '@/app/lib/utils/utils';
import { motion } from 'motion/react';


export const MessageItem= ({ message, isStreaming }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group w-full py-8 flex flex-col items-center"
    >
      <div className="w-full max-w-2xl flex gap-4 px-4 items-start">
        {isAssistant ? (
          <div className="w-7 h-7 rounded-full bg-brand-primary flex-shrink-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#3b82f6] flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
            JD
          </div>
        )}
        
        <div className="flex-1 space-y-1">
          <div className="font-semibold text-sm text-text-main">
            {isAssistant ? "Nexus AI" : "You"}
          </div>
          
          <div className={cn(
            "prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-border-subtle prose-code:text-brand-primary text-base",
            isAssistant ? "text-text-dim" : "text-text-main"
          )}>
            {isAssistant ? (
              <ReactMarkdown>
                {message.content + (isStreaming ? " ▎" : "")}
              </ReactMarkdown>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>

          {isAssistant && !isStreaming && (
            <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-md hover:bg-white/5 text-text-muted hover:text-text-dim transition-all" title="Copy">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-white/5 text-text-muted hover:text-text-dim transition-all" title="Like">
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-white/5 text-text-muted hover:text-text-dim transition-all" title="Dislike">
                <ThumbsDown className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-white/5 text-text-muted hover:text-text-dim transition-all" title="Regenerate">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
