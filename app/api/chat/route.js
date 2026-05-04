import chatGroq from "@/app/lib/chat_openai"
import {userChatHistory, assistantChatHistory} from "@/app/lib/messages"
import { NextResponse } from "next/server"
import  searchVectorDb  from "@/app/lib/vectordb_search"

export async function POST(req){
    const data =await req.json()
    const query = data.message
    const message = userChatHistory(query)
    const chatResponse = await chatGroq(message)
    assistantChatHistory(chatResponse)
    return NextResponse.json({status : true,response : chatResponse})
}