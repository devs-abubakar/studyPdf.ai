import React from 'react';
import { Plus, MessageSquare, MoreHorizontal, LogOut, Settings, User } from 'lucide-react';
import { cn } from '@/app/lib/utils/utils';


export const Sidebar = ({ 
  sessions, 
  activeSessionId, 
  onNewChat, 
  onSelectSession,
  className 
}) => {
  return (
    <aside className={cn("hidden md:flex flex-col w-[260px] h-screen bg-sidebar-bg border-r border-border-subtle p-3", className)}>
      <button
        onClick={onNewChat}
        className="flex items-center justify-between px-3 py-2 text-sm font-medium text-text-main bg-transparent border border-border-input rounded-lg hover:bg-white/5 transition-colors w-full mb-6 group"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
            <Plus className="w-3 h-3 text-white" />
          </div>
          New Chat
        </div>
      </button>

      <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
        {sessions.length > 0 && (
          <div>
            <h3 className="px-3 text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">History</h3>
            <div className="space-y-0.5">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg transition-colors group relative",
                    activeSessionId === session.id 
                      ? "bg-white/10 text-text-main" 
                      : "text-text-dim hover:bg-white/5"
                  )}
                >
                  <MessageSquare className="w-4 h-4 shrink-0 opacity-60" />
                  <span className="truncate flex-1 text-left">{session.title}</span>
                  <MoreHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-border-subtle space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-dim rounded-lg hover:bg-white/5 transition-colors">
          <Settings className="w-4 h-4 opacity-70" />
          Settings
        </button>
        <div className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-main rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-emerald-400 flex items-center justify-center font-bold text-xs text-white">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Jane Doe</div>
            <div className="text-[10px] text-text-muted truncate">jane.doe@studio.design</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
