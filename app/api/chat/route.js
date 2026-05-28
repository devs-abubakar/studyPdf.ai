import chatGroq from "@/app/lib/ai/chat_openai"
import { UploadChatSessionDetails } from "@/app/lib/services/chat-session-service"
import { NextResponse } from "next/server"
import {createClient} from "@/app/lib/supabase/server"
import { UplaodChatMessageDetails } from "@/app/lib/services/chat-message-service"

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
    let currentSessionId = sessionId
    console.log("currentSession =====>",currentSessionId)
    console.log("user id is ===>",userId)
    
//     const message = userChatHistory(query)
//     const fetchK = 20
//     const retriever = vectorStore.asRetriever({
//   k: 10,
//   verbose: true,
//   searchType: 'mmr',
//   searchKwargs: { alpha: 0.5 },
// });
//     const results =await retriever.invoke(query)
//     console.log("retriever Search Results:", results); 

//     if (!results || results.length === 0) {
//       return NextResponse.json({
//         status: false,
//         response: "No relevant context found in knowledge base."
//       });
//     }
//     const context = results.map(c=>c.pageContent).join("/n/n")

//     const prompt = `
//     You are a helpful assistant.

//     Use ONLY the context below to answer.

//     Context:
//     ${context}

//     Question:
//     ${query}

//     Answer in under 200 words.
//     `;
    const title= "New chat"
    if(!currentSessionId){
        const chatSession = await UploadChatSessionDetails({userId:userId,title:title,supabase:supabase})
        currentSessionId = chatSession.message.id
    }
    console.log("Currentsession after update ====>",currentSessionId)
    const userMessage = await UplaodChatMessageDetails({sessionId:currentSessionId,message:latestMessage.content,role:"user",supabase:supabase})
    console.log("user message===> ",userMessage)
    const chatResponse = await chatGroq(messages)
    const assistantMessage = await UplaodChatMessageDetails({sessionId:currentSessionId,message:chatResponse,role:"assistant",supabase:supabase})
    console.log("assistant message===> ",assistantMessage)
    console.log("chatResponse --->",chatResponse)
    return NextResponse.json({status : true,response : chatResponse, sessionId : currentSessionId ,title : title})
}