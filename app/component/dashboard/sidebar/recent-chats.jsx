import { ChatItem } from "./chat-item"
import {useChatStore} from "@/store/chat-store"
import { useEffect, useState, useMemo } from "react"
import { supabase } from "@/app/lib/supabase/client"


export function RecentChats({collapsed}) {
  const activeChat = useChatStore((s)=>s.activeChat)
  const setActiveChat = useChatStore((s)=>s.setActiveChat)
  const chats= useChatStore((s)=>s.chats)
  const setChats = useChatStore((s)=>s.setChats)
  const setQuery = useChatStore((s)=>s.setQuery)
  const searchQuery = useChatStore((s)=>s.searchQuery)

  function handleClick(id){
    console.log("opening the chat with id : ",id)
    setQuery("")
    setActiveChat(id)
  }
  
  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats
    const query = searchQuery.toLowerCase()
    return chats.filter(chat => 
      chat.title?.toLowerCase().includes(query)
    )
  }, [chats, searchQuery])

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
        {filteredChats.map((chat) => (
          <ChatItem
            key={chat.sessionId}
            title={chat.title}
            onClick={()=>handleClick(chat.sessionId)}
            active={activeChat == chat.sessionId}
            sessionId={chat.sessionId}
          />
        ))}
      </div>
    </div>
  )
}}