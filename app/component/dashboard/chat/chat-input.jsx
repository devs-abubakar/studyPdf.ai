"use client"
import { useRef, useState , useEffect} from 'react'
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from '@/store/chat-store'
import {UploadDropdown} from './input/option-drawer'
import FilePill from './input/file-pill'

 

export function ChatInput() {
  const [query,setQuery] = useState("")
  const [uploadingFile,setUploadingFile] = useState(false)
  const [isReady,setIsReady] = useState(false)
  const activeChat = useChatStore((state)=>state.activeChat)
  const createNewChat = useChatStore((state)=>state.createNewChat)
  const addMessage = useChatStore((state)=>state.addMessage)
  const appendToLastMessage = useChatStore((state) => state.appendToLastMessage)
  const chats = useChatStore((state)=>state.chats)
  const currentChat = chats.find(c => c.sessionId === activeChat)
  const messages = currentChat?.messages || []
  const [selectedFile,setSelectedFile] = useState(null)
  const [filename, setFilename] = useState("")
  const fileRef = useRef(null)

const handleKeyDown = (e)=>{
  console.log(e)
  if (e.key === "Enter" && !e.shiftKey){
    e.preventDefault()
    handleSubmit()
  }
}
  
function handleFileChange(e){

  const file = e.target.files[0]
  console.log("File details : ",file)
  setFilename(file?.name)
  console.log("File Name",filename)
  if (!file){
    return
  }
  setSelectedFile(file)
  console.log(selectedFile)
}
  
function handleRemoveFile(){
  setIsReady(false)
  setUploadingFile(false)
  setSelectedFile(null)
  setFilename("")
}
async function getResponse(messages,sessionId) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages : messages ,sessionId:sessionId })
    })
    if (!response.ok) { throw new Error("Api failed")}
    addMessage("assistant", " ")
    const reader = response.body.getReader()
    console.log(reader)
    const decoder = new TextDecoder()
    let done = false

    while(!done){
      const {value , done : doneReading} = await reader.read()
      console.log(value)
      console.log("done reading",doneReading)
      done = doneReading
      if(value){
        const chunkValue = decoder.decode(value,{stream:true})
        console.log("Recieved token",chunkValue)
        appendToLastMessage(chunkValue)
      }
    }
  }catch(err){
        console.error(err)
      }}

async function uploadFile(formData){
    setUploadingFile(true)
    try{
      const response = await fetch("/api/files",{
        method : "POST",
        body:formData
      }
      )
      setUploadingFile(false)
      setIsReady(true)
    return response

    }catch(e){
      console.log("An error occured : ",e)
      setUploadingFile(false)
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

  const currentQuery = query

  const userMessage = {
    role: "user",
    content: currentQuery
  }
  let currentSessionId = activeChat
  if(!currentSessionId){
    currentSessionId = crypto.randomUUID()
    createNewChat(currentSessionId, currentQuery.slice(0, 5))
    console.log("this is the session id created ===>",currentSessionId)
  }
  console.log("user message variable ==>",userMessage)
  addMessage("user", currentQuery)
  console.log("messages after addMessage to zustand",messages)
  setQuery("")

  const currentMessages = [
    ...(messages || []),
    userMessage
  ]
  console.log("Messages from zustand ==>",messages)
  console.log("current messages",currentMessages)
  const result = await getResponse(currentMessages,currentSessionId)
  
}
  function handleChange(e){
    e.preventDefault()
    const data = e.target.value
    setQuery(data)
  }


  return (
    <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start gap-2 rounded-2xl border bg-background p-2 shadow-sm">
         <div>
          {selectedFile && <FilePill fileName={filename} onClick={handleRemoveFile} isReday={isReady} uploadingFile={uploadingFile}/>}
        </div>
        <Textarea
            placeholder="Ask anything..."
            onChange={handleChange}
            value={query}
            onKeyDown={handleKeyDown}
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

        <div className='flex w-full justify-between'>
        <UploadDropdown onSelect={handleSelectItem}  />
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}

        />
          <Button
            disabled={uploadingFile}
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