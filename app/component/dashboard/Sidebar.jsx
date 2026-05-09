"use client";

import Link from "next/link";
import { FileText, MessageSquare, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 h-screen p-4 flex flex-col">
      
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          studyPdf.ai
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-900"
        >
          <MessageSquare size={18} />
          Chat
        </Link>

        <Link
          href="/dashboard/files"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-900"
        >
          <FileText size={18} />
          Files
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-900"
        >
          <Settings size={18} />
          Settings
        </Link>

      </nav>
    </aside>
  );
}