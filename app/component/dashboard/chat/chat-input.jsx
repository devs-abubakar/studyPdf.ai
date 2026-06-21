"use client"

import { useRef, useState, useEffect } from 'react'
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from '@/store/chat-store'
import { UploadDropdown } from './input/option-drawer'
import FilePill from './input/file-pill'

export function ChatInput() {
  const [query, setQuery] = useState("")
  const [uploadingFile, setUploadingFile] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filename, setFilename] = useState("")
  const fileRef = useRef(null)

  // Zustand State Store Actions
  const activeChat = useChatStore((state) => state.activeChat)
  const createNewChat = useChatStore((state) => state.createNewChat)
  const addMessage = useChatStore((state) => state.addMessage)
  const appendToLastMessage = useChatStore((state) => state.appendToLastMessage)
  const updateLastMessagePayload = useChatStore((state) => state.updateLastMessagePayload) 
  const chats = useChatStore((state) => state.chats)
  const updateChatTitle = useChatStore((state) => state.updateChatTitle)
  const updateChatPersisted = useChatStore((state) => state.updateChatPersisted)
  const setAgentAction = useChatStore((state)=>state.setAgentAction)
  const agentAction = useChatStore((state)=>state.agentAction)
  const currentChat = chats.find(c => c.sessionId === activeChat)
  const messages = currentChat?.messages || []

  // Handle keyboard submit shortcut
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }
  
  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    
    setFilename(file.name)
    setSelectedFile(file)
  }
  
  function handleRemoveFile() {
    setIsReady(false)
    setUploadingFile(false)
    setSelectedFile(null)
    setFilename("")
    if (fileRef.current) fileRef.current.value = ""
  }

  // Handle SSE Chunk Stream Processing
  async function getResponse(currentMessages, sessionId) {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages, sessionId })
      })

      if (!response.ok) throw new Error("API Route request failed")

      // Extract system headers metadata
      const chatTitle = response.headers.get('x-chat-title')
      const persisted = response.headers.get("x-chat-persisted")
      
      if (persisted) updateChatPersisted(persisted)
      if (chatTitle) updateChatTitle(sessionId, chatTitle)

      // Initialize an empty assistant text bubble
      addMessage("assistant", "")

      const reader = response.body?.getReader()
      if (!reader) return
      
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        
        if (value) {
          const chunkValue = decoder.decode(value, { stream: true })
          const lines = chunkValue.split("\n")

          for (const line of lines) {
            const trimmedLine = line.trim()
            if (!trimmedLine.startsWith("data:")) continue
            
            const jsonStr = trimmedLine.replace("data:", "").trim()
            if (jsonStr.toLocaleLowerCase().includes("[done]")) continue
            console.log(agentAction)
            try {
              const parsedJson = JSON.parse(jsonStr)
              console.log(parsedJson)
              // Type : Handle tool_start 
              if(parsedJson.type === "tool_start"){
                setAgentAction(parsedJson?.toolName)
              }
              // Type : Handle tool_end 
              if(parsedJson.type === "tool_end"){
                setAgentAction(null)
              }
              // Type : Handle Standard Text generation chunks
              if (parsedJson.type === "token") {
                appendToLastMessage(parsedJson.content)
              }
              if (parsedJson.type === "error"){
                appendToLastMessage("Something went wrong")
              }

              // Type : Handle PDF compilation tool completions(still working on the pdf part) 
              if (parsedJson.type === "tool_result" && parsedJson.name === "createPdf") {
                // Attach the payload metadata straight to the message block in Zustand
                updateLastMessagePayload({
                  pdfData: parsedJson.result.pdfData // Struct data containing filename, title, etc.
                })
              }
            } catch (e) {
              console.error("Invalid SSE line stream chunk parse error:", line,e)
            }
          }
        }
      }
    } catch (err) {
      console.error("Critical stream handler failure:", err)
    }
  }
      
  async function uploadFile(formData) {
    setUploadingFile(true)
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData
      })
      setUploadingFile(false)
      setIsReady(true)
      return response
    } catch (e) {
      console.error("File ingestion network error:", e)
      setUploadingFile(false)
    }
  }

  // Monitor Selected Files to auto-trigger pipeline
  useEffect(() => {
    if (!selectedFile) return
    
    let targetSessionId = activeChat
    if (!targetSessionId) {
      targetSessionId = crypto.randomUUID()
      createNewChat(targetSessionId, "Untitled Document")
    }

    const formData = new FormData()
    formData.append("sessionId", targetSessionId)
    formData.append("file", selectedFile)

    uploadFile(formData)
  }, [selectedFile])

  function handleSelectItem(type) {
    if (type === "pdf" && fileRef.current) {
      fileRef.current.click()
    }
  }

  async function handleSubmit() {
    if (!query.trim()) return

    const currentQuery = query
    const userMessage = { role: "user", content: currentQuery }
    let currentSessionId = activeChat

    if (!currentSessionId) {
      currentSessionId = crypto.randomUUID()
      createNewChat(currentSessionId, "Untitled Document")
    }

    addMessage("user", currentQuery)
    setQuery("")

    const currentMessages = [...(messages || []), userMessage]
    await getResponse(currentMessages, currentSessionId)
  }

  return (
    <div className="mx-auto max-w-3xl w-full">
      <div className="flex flex-col items-start gap-2 rounded-2xl border bg-background p-2 shadow-sm">
        <div>
          {selectedFile && (
            <FilePill 
              fileName={filename} 
              onClick={handleRemoveFile} 
              isReady={isReady} 
              uploadingFile={uploadingFile}
            />
          )}
        </div>
        
        <Textarea
          placeholder="Ask anything..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={handleKeyDown}
          className="min-h-13 max-h-40 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
        />

        <div className='flex w-full justify-between items-center'>
          <UploadDropdown onSelect={handleSelectItem} />
          <input
            ref={fileRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            disabled={uploadingFile || !query.trim()}
            size="icon"
            className="size-10 rounded-full shrink-0"
            onClick={handleSubmit}
          >
            <ArrowUp className="size-5" />
          </Button>
        </div> 
      </div>
    </div>
  )
}