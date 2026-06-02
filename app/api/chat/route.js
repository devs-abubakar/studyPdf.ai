import { google, groq } from "@/app/lib/ai/chat_openai" 
import { UpdateChatSessionDetails, UploadChatSessionDetails } from "@/app/lib/services/chat-session-service"
import { NextResponse, after } from "next/server"
import { createClient } from "@/app/lib/supabase/server"
import { UploadChatMessageDetails } from "@/app/lib/services/chat-message-service"
import { TitleGenerator } from "@/app/lib/ai/titleGenerator"
import { createServiceClient } from "@/app/lib/supabase/service"
import { createDocumentAgent, runAgentAndCollectResponse } from "@/app/lib/langgraph/agent"
import { convertToLangChainMessages } from "@/app/lib/langgraph/state"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(req) {
  const startTime = Date.now()
  try{
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ status: 401, message: "unauthorized user" })

  const { messages, sessionId } = await req.json()
  console.log("messages in the route ===>",messages)
  const userId = user.id
  const latestMessage = messages[messages.length - 1]
  const isNew = messages.length === 1
  let title = "untitled"
  let persisted = false
  if (isNew) {
    // INSERT + title gen in parallel — both awaited before stream starts
    const [sessionDetails,generatedTitle] = await Promise.all([
      UploadChatSessionDetails({ id: sessionId,userId:userId,title :title,supabase: supabase,persisted:true }),
      TitleGenerator(latestMessage.content)
    ])
    title = generatedTitle
    const serviceSupabase = createServiceClient()
    persisted = sessionDetails.message
    // after() keeps the function alive on Vercel until this DB write finishes
after(
  Promise.all([
    UpdateChatSessionDetails({ id: sessionId, userId, title, supabase: serviceSupabase })
      .then((data) => console.log("✅ title updated:", data))
      .catch(err => console.error("❌ title update failed:", err)),
    UploadChatMessageDetails({ sessionId:sessionId, message: latestMessage.content, role: "user", supabase: serviceSupabase })
      .then((data) => console.log("✅ user message saved:", data))
      .catch(err => console.error("❌ user message failed:", err))
  ])
)
  } else {
    const serviceSupabase = createServiceClient()
    after(
      UploadChatMessageDetails({ sessionId, message: latestMessage.content, role: "user", supabase : serviceSupabase })
        .catch(err => console.error("message save failed:", err))
    )
  }

    console.log("[Chat] Creating document agent...");
    const agent = await createDocumentAgent(supabase, sessionId);
    const langChainMessages = convertToLangChainMessages(messages);
    
    console.log("[Chat] Running agent...");
    const response = await runAgentAndCollectResponse(agent, langChainMessages, sessionId);
    
    console.log(`[Chat] Response generated (${response.length} chars)`);
    
    // Save assistant response
    await UploadChatMessageDetails({
      sessionId,
      message: response,
      role: "assistant",
      supabase,
    });
    
    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(response));
        controller.close();
      },
    });
    
    console.log(`[Chat] Total time: ${Date.now() - startTime}ms`);
    
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        ...(isNew && {
          "x-chat-title": encodeURIComponent(title),
          "x-chat-persisted": "true",
          "x-chat-status": "success",
        }),
      },
    });
    
  } catch (error) {
    console.error("[Chat] Error:", error);
    
    const errorMessage = "I'm having trouble processing your request. Please try again in a moment.";
    
    const encoder = new TextEncoder();
    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(errorMessage));
        controller.close();
      },
    });
    
    return new Response(errorStream, {
      headers: { "Content-Type": "text/event-stream" },
      status: 200, // Return 200 with error message instead of 500
    });
  }
}