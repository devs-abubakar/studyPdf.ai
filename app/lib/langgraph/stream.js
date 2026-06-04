import { streamAgentResponse } from "./agent"
import { createServiceClient } from "@/app/lib/supabase/service"
import { after } from "next/server"
import { UploadChatMessageDetails } from "../services/chat-message-service"

export function buildAgentStream({agent,messages,sessionId,responseHeaders={}}){
    console.log("messages in  the build agent stream is ====>",messages)
    const encoder = new TextEncoder()
    let fullResponse = ""
    const stream = new ReadableStream({
        async start(controller){
            try{
                for await(const event of streamAgentResponse(agent,messages,sessionId)){
                    console.log("event in the controller ===",event)
                    if (event.type === "token"){
                        fullResponse+=event.content
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({type:"token",content:event.content})}\n\n`)
                        )
                    }
                    if (event.type === "tool_start"){
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({type:"tool_start",toolName:event.toolName})}\n\n`)
                        )
                    }
                    if (event.type === "tool_end"){
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({type:"tool_end"})}\n\n`)
                        )
                    }
                    if (event.type === "end" || event.type === "done"){
                        controller.enqueue(
                            encoder.encode(`data:[Done] }\n\n`)
                        )
                    controller.close()
                    }
                }
            }catch(e){
                console.error("[Stream] error",e)
                controller.close()
            }
    const serviceSupabase = createServiceClient()
    after(
        UploadChatMessageDetails({
        sessionId,
        message: fullResponse,
        role: "assistant",
        supabase: serviceSupabase,
        }).catch(err => console.error("❌ assistant message save failed:", err))
    )
    },
})
    return new Response(stream,{
        headers:{
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        ...responseHeaders,
        }
    })
}