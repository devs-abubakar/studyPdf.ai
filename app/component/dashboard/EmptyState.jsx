import React from 'react';
import { Sparkles, Code, Pencil, Lightbulb, Search } from 'lucide-react';
import { motion } from 'motion/react';

const SUGGESTIONS = [
  { icon: <Code className="w-4 h-4 text-blue-400" />, text: "Write a React hook for fetching data", color: "bg-blue-500/10" },
  { icon: <Pencil className="w-4 h-4 text-orange-400" />, text: "Help me write a professional email to my boss", color: "bg-orange-500/10" },
  { icon: <Lightbulb className="w-4 h-4 text-yellow-500" />, text: "Explain quantum computing in simple terms", color: "bg-yellow-500/10" },
  { icon: <Search className="w-4 h-4 text-emerald-400" />, text: "Compare electric cars vs gas cars", color: "bg-emerald-500/10" },
];

export const EmptyState = ({ onSuggestionClick }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
      >
        <Sparkles className="w-10 h-10 text-black" />
      </motion.div>
      
      <h1 className="text-3xl font-bold text-text-main mb-12 text-center tracking-tight">
        How can I help you today?
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {SUGGESTIONS.map((suggestion, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="flex flex-col items-start p-4 border border-border-subtle rounded-2xl hover:bg-white/5 transition-all text-left group"
          >
            <div className={`p-2 rounded-lg ${suggestion.color} mb-3 group-hover:scale-110 transition-transform`}>
              {suggestion.icon}
            </div>
            <p className="text-sm font-medium text-text-dim group-hover:text-text-main transition-colors">{suggestion.text}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
