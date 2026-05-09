"use client";

import Input from "../ui/input";
import Button from "../ui/button";

export default function ChatPanel() {
  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        
        <div className="bg-zinc-800 p-4 rounded-2xl max-w-xl">
          Hello, upload a PDF and ask questions.
        </div>

      </div>

      <div className="border-t border-zinc-800 p-4 flex gap-3">
        <Input placeholder="Ask anything about your PDF..." />

        <Button>
          Send
        </Button>
      </div>
    </div>
  );
}