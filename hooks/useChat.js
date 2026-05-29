import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";

export function useChat(){
  const [chats,setChats] = useState([]);
  useEffect(()=>{
    async function load(){
    const {data,error} =await supabase.from('chat_sessions').select('id,title,created_at').order('created_at',{ascending:false}).range(0,9)
    if(error){
      console.error(error)
    }
    setChats(data || [])
  }
  load()
  },[])
  return chats
}