"use client"

import { useAuth } from "@/hooks/useAuth"
import { useUpload } from "@/hooks/useUpload"
import { useChat } from "@/hooks/useChat"

import {ChatInterface} from '@/app/component/dashboard/ChatInterface'

export default function Dashboard() {
  const { user } = useAuth()

  const {
    selectedFile,
    previewUrl,
    handleChangeFile,
    uploadFile
  } = useUpload()

  const {
    message,
    setMessage,
    sendMessage,
    messages
  } = useChat()

  return (
    <div className ="w-full h-full flex " >
      <ChatInterface/>
    </div>
  )
}