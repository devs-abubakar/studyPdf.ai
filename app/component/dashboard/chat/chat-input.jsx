"use client"
import { useRef, useState , useEffect} from 'react'
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from '@/store/chat-store'
import {UploadDropdown} from './input/option-drawer'


export function ChatInput() {
  const [query,setQuery] = useState("")
  const activeChat = useChatStore((state)=>state.activeChat)
  const createNewChat = useChatStore((state)=>state.createNewChat)
  const addMessage = useChatStore((state)=>state.addMessage)
  const messages = useChatStore((state)=>state.messages)
  const [selectedFile,setSelectedFile] = useState(null)
  const fileRef = useRef(null)
  
function handleFileChange(e){
  const file = e.target.files[0]
  console.log(file)
  if (!file){
    return
  }
  setSelectedFile(file)
  console.log(selectedFile)
}
  
async function getResponse(messages) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    })
    if (!response.ok) {
  return {
    success: false,
    message: "API failed"
  }
}

    const data = await response.json()

    return data

  } catch (err) {
    console.error(err)

    return {
      success: false,
      message: "Fetch failed"
    }
  }
}

async function uploadFile(formData){
    try{
      const response = await fetch("/api/files",{
        method : "POST",
        body:formData
      }
      )
    return response
    }catch(e){
      console.log("An error occured : ",e)
    }
}

useEffect(() => {
  if (!selectedFile) return

  const formData = new FormData()
  formData.append("file", selectedFile)

  uploadFile(formData)
}, [selectedFile])

function handleSelectItem(type){
  if (type === "pdf"){
    fileRef.current.click()
  }
  
}

  async function handleSubmit() {
  if (!query.trim()) return

  const updatedMessages = [
    ...messages,
    {
      role: "user",
      content: query
    }
  ]

  if (!activeChat) {
    createNewChat("New Chat")
  }

  addMessage("user", query)

  setQuery("")

  const result = await getResponse(updatedMessages)

  addMessage("assistant", result.response)
}
  function handleChange(e){
    e.preventDefault()
    const data = e.target.value
    setQuery(data)
  }


  return (
    <div className="mx-auto max-w-3xl">
      
        
        <div className="flex items-center gap-2 rounded-2xl border bg-background p-2 shadow-sm">
        <UploadDropdown onSelect={handleSelectItem}  />
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
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
  )
}