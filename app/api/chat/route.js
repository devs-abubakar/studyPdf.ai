import {groq} from "@/app/lib/ai/chat_openai"
import { UpdateChatSessionDetails, UploadChatSessionDetails } from "@/app/lib/services/chat-session-service"
import { NextResponse } from "next/server"
import {createClient} from "@/app/lib/supabase/server"
import { UplaodChatMessageDetails } from "@/app/lib/services/chat-message-service"
import {streamText} from "ai"
import { TitleGenerator } from "@/app/lib/ai/titleGenerator"

export async function POST(req){
    
    const supabase = await createClient()
    const {data:{user}} =await supabase.auth.getUser()
    console.log("api hit")
    if (!user){
      return NextResponse.json({status:401,message:"unauthorized user"})
    }
    const { messages ,sessionId } =await req.json()
    console.log("query in the route data --->",messages)
    const userId= user.id
    const latestMessage = messages[messages.length - 1] 
    console.log("Latest message =====>",latestMessage)
    console.log("currentSession =====>",sessionId)
    console.log("user id is ===>",userId)
    
    const title= "New chat"
    const dbPromise = Promise.all([
      UploadChatSessionDetails({id:sessionId,userId:userId,title:title,supabase:supabase}),
      UplaodChatMessageDetails({sessionId:sessionId,message:latestMessage.content,role:"user",supabase:supabase}),
    ])
    const finalTitle = await TitleGenerator(latestMessage.content, async (title) => {
  await UpdateChatSessionDetails({
    id: sessionId,
    userId,
    supabase,
    title,
  });
});const result = streamText({
     model: groq("llama-3.3-70b-versatile"), 
     messages, 
     onFinish: async ({ text }) => { 
      try { 
        await UplaodChatMessageDetails({
           sessionId, message: text, role: "assistant", supabase })
           } catch (err) {
             console.error("assistant save failed", err) 
            } } })
  dbPromise.catch((err)=>{
    console.error("failed to write db",err)
  })
    console.log("llm stream response ==>",result)

   return result.toTextStreamResponse({
     headers: { 
      "x-chat-title": finalTitle || title,
      "x-chat-status": "success" 
    }
   }
  )
   }
