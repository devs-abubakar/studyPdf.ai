import { streamAgentResponse } from "./agent"
import { createServiceClient } from "@/app/lib/supabase/service"
import { after } from "next/server"
import { UploadChatMessageDetails } from "../services/chat-message-service"

export function buildAgentStream({agent,messages,sessionId,responseHeaders={}}){
    console.log("sessionId in  the build agent stream is ====>",sessionId)
    const encoder = new TextEncoder()
    let fullResponse = ""
    const stream = new ReadableStream({
        async start(controller){
            try{
                for await(const event of streamAgentResponse(agent,messages,sessionId)){
                    console.log("event in the controller for sessionId ===",sessionId)
                    if (event.type === "token"){
                        fullResponse+=event.content
                        console.log("EVENT TYPE ",event.type)
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({type:"token",content:event.content})}\n\n`)
                        )
                    }
                    if (event.type === "tool_start"){
                                                console.log("EVENT TYPE and Session id ",event.type,sessionId)
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({type:"tool_start",toolName:event.toolName})}\n\n`)
                        )
                    }
                    if (event.type === "tool_end"){
                                                console.log("EVENT TYPE and Session id ",event.type,sessionId)
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({type:"tool_end"})}\n\n`)
                        )
                    }
                    if (event.type === "done"){
                                                console.log("EVENT TYPE and Session id ",event.type,sessionId)
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({type:"done"})} \n\n`)
                        )
                        break
                    }
                }
                controller.close()
            }catch(e){
                console.error("[Stream] error",e)
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({type:"error",message:"Streaming lifecycle failure"})}\n\n`)
                )
                controller.close()
            }
        },
    })
    const serviceSupabase = createServiceClient()
    after(()=>{
        if(!fullResponse.trim()) return
        UploadChatMessageDetails({
        sessionId,
        message: fullResponse,
        role: "assistant",
        supabase: serviceSupabase,
        }).catch(err => console.error(" assistant message save failed:", err))
        })
    return new Response(stream,{
        headers:{
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache no-transform",
        Connection: "keep-alive",
        ...responseHeaders,
        }
    })
}