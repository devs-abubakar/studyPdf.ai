import { ChatItem } from "./chat-item"
import {useChatStore} from "@/store/chat-store"
import { useEffect, useState } from "react"
import { supabase } from "@/app/lib/supabase/client"
import { useMessages } from "@/hooks/useMessages"
import { getChatContext } from "@/app/lib/rag/getChatContext"


export function RecentChats({collapsed}) {
  const activeChat = useChatStore((s)=>s.activeChat)
  const setActiveChat = useChatStore((s)=>s.setActiveChat)
  const chats= useChatStore((s)=>s.chats)
  const setChats = useChatStore((s)=>s.setChats)

  function handleClick(id){
    console.log("opening the chat with id : ",id)
    setActiveChat(id)
  }
  useEffect(() => {
  async function checkTool(){
    if (activeChat){
      const data = await getChatContext({sessionId:activeChat,supabase:supabase,query:"hello"})
    }
  }
  checkTool()
  }, [activeChat])
  

  useEffect(() => {
    async function loadChats(){
      const {data,error} = await supabase.from("chat_sessions").select('id,title,created_at,persisted').order('created_at',{ascending:false}).range(0,9)
      if(error){
        alert("Error while fetching the recent chats")
      }
      console.log(data)
      const formattedChats = data.map((chat)=>({
          sessionId:chat.id,
          title:chat.title,
          messages:[],
          persisted:chat.persisted
        })
      )
      setChats(formattedChats)
    }
    loadChats()
  }, [])
  
  if (!collapsed){return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">
        Recent Chats
      </h3>

      <div className="space-y-1">
        {chats.map((chat) => (
          <ChatItem
            key={chat.sessionId}
            title={chat.title}
            onClick={()=>handleClick(chat.sessionId)}
            active = {activeChat == chat.sessionId}
          />
        ))}
      </div>
    </div>
  )
}}