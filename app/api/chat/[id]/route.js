import { google, groq } from "@/app/lib/ai/chat_openai" 
import { UpdateChatSessionDetails, UploadChatSessionDetails,deleteChatSession, updateTitle } from "@/app/lib/services/chat-session-service"
import { NextResponse, after } from "next/server"
import { createClient } from "@/app/lib/supabase/server"
import { UploadChatMessageDetails } from "@/app/lib/services/chat-message-service"
import { TitleGenerator } from "@/app/lib/ai/titleGenerator"
import { createServiceClient } from "@/app/lib/supabase/service"
import { createDocumentAgent} from "@/app/lib/langgraph/agent"
import { convertToLangChainMessages } from "@/app/lib/langgraph/state"
import { buildAgentStream } from "@/app/lib/langgraph/stream"
import { getChatContext } from "@/app/lib/auth/chat-context"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(req, { params }) {
  const startTime = Date.now()
  const resolvedParams = await params
  const sessionId = resolvedParams.id
  
  if (!sessionId) {
    return NextResponse.json({ status: 401, message: "chat not found" })
  }
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 401, message: "unauthorized user" })

    const { messages } = await req.json()
  
    console.log("messages in the route and the session id  ===>", messages, sessionId)
    const userId = user.id
    const latestMessage = messages[messages.length - 1]
    const isNew = messages.length === 1
    let title = "untitled"
    let persisted = false
    if (isNew) {
      // INSERT + title gen in parallel — both awaited before stream starts
      console.time('saving session details and title gen completed')
      const [sessionDetails, generatedTitle] = await Promise.all([
        UploadChatSessionDetails({ id: sessionId, userId: userId, title: title, supabase: supabase, persisted: true }),
        TitleGenerator(latestMessage.content)
      ])
      console.timeEnd('saving session details and title gen completed')
      title = generatedTitle
      const serviceSupabase = createServiceClient()
      persisted = sessionDetails.message
      // after() keeps the function alive on Vercel until this DB write finishes
      after(
        Promise.all([
          UpdateChatSessionDetails({ id: sessionId, userId, title, supabase: serviceSupabase })
            .then((data) => console.log(" title updated:", data))
            .catch(err => console.error(" title update failed:", err)),
          UploadChatMessageDetails({ sessionId: sessionId, message: latestMessage.content, role: "user", supabase: serviceSupabase })
            .then((data) => console.log(" user message saved:", data))
            .catch(err => console.error(" user message failed:", err))
        ])
      )
    } else {
      const serviceSupabase = createServiceClient()
      after(
        UploadChatMessageDetails({ sessionId, message: latestMessage.content, role: "user", supabase: serviceSupabase })
          .catch(err => console.error("message save failed:", err))
      )
    }
  
    console.log("[Chat] Creating document agent...");
    console.time("creating agent ended")
    const agent = await createDocumentAgent(supabase, sessionId);
    console.timeEnd("creating agent ended")
    const langChainMessages = convertToLangChainMessages(messages);
    
    return buildAgentStream({
      agent, sessionId, messages: langChainMessages, responseHeaders: isNew ? {
        "x-chat-title": encodeURIComponent(title),
        "x-chat-persisted": "true",
        "x-chat-status": "success",
      } : {},
    })
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

export async function DELETE(request, { params }) {
  try {
    const {
      supabase,
      userId,
      sessionId,
    } = await getChatContext(params)
    const result = await deleteChatSession({ id: sessionId, supabase: supabase, userId: userId })
    console.log(result)
    return NextResponse.json({ status: 200, message: "chat session deleted" })
  } catch (error) {
    return NextResponse.json({ status: 500, message: "internal server error" })
  }
}


export async function PUT(request, { params }) {
  try {
    const {
      supabase,
      userId,
      sessionId,
    } = await getChatContext(params)
    
    const { title } = await request.json()
    try {
      const result = await updateTitle({ id: sessionId, userId: userId, title: title, supabase: supabase })
      return NextResponse.json({ status: 200, message: "title updated", data: result })
    } catch (error) {
      return NextResponse.json({ status: 500, message: "internal server error" })
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "internal server error" })
  }
}