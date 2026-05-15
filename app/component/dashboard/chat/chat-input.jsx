"use client"
import { useState } from 'react'
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from '@/store/chat-store'


export function ChatInput() {
  const [query,setQuery] = useState("")
  const activeChat = useChatStore((state)=>state.activeChat)
  const createNewChat = useChatStore((state)=>state.createNewChat)
  const addMessage = useChatStore((state)=>state.addMessage)
  function handleSubmit(){
    if(!query || !query.trim()){
      return
    }
    if(!activeChat){
      createNewChat()
    }
    addMessage("user",query)
    setQuery("")
    addMessage("assistant","hey there")
    
  }

  function handleChange(e){
    e.preventDefault()
    const data = e.target.value
    setQuery(data)
  }


  return (
    <div className="border-t bg-background p-4">
      
      <div className="mx-auto max-w-4xl w-4xl">
        
        <div className="flex items-center gap-2 rounded-2xl border bg-background p-2 shadow-sm">
          
          <Textarea
            placeholder="Ask anything..."
            onChange={handleChange}
            value={query}
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
            onClick = {handleSubmit}
          >
            <ArrowUp className="size-5" />
          </Button>

        </div>

      </div>

    </div>
  )
}