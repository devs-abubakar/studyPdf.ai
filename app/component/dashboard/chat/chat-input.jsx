"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ChatInput() {
  return (
    <div className="border-t bg-background p-4">
      
      <div className="mx-auto max-w-4xl">
        
        <div className="flex items-center gap-2 rounded-2xl border bg-background p-2 shadow-sm">
          
          <Textarea
            placeholder="Ask anything..."
            className="
              min-h-13
              max-h-40
              resize-none
              border-0
              bg-transparent
              focus-visible:ring-0
              focus-visible:ring-offset-0
            "
          />

          <Button
            size="icon"
            className="size-10 rounded-full shrink-0"
          >
            <ArrowUp className="size-5" />
          </Button>

        </div>

      </div>

    </div>
  )
}