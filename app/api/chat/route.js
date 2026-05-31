import { groq } from "@/app/lib/ai/chat_openai"
import { UpdateChatSessionDetails, UploadChatSessionDetails } from "@/app/lib/services/chat-session-service"
import { NextResponse, after } from "next/server"
import { createClient } from "@/app/lib/supabase/server"
import { UplaodChatMessageDetails } from "@/app/lib/services/chat-message-service"
import { streamText } from "ai"
import { TitleGenerator } from "@/app/lib/ai/titleGenerator"
import { createServiceClient } from "@/app/lib/supabase/service"

export async function POST(req) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ status: 401, message: "unauthorized user" })

  const { messages, sessionId } = await req.json()
  const userId = user.id
  const latestMessage = messages[messages.length - 1]
  const isNew = messages.length === 1
  
  let title = "untitled"
  if (isNew) {
    // INSERT + title gen in parallel — both awaited before stream starts
    const [,generatedTitle] = await Promise.all([
      UploadChatSessionDetails({ id: sessionId,userId:userId,title :title,supabase: supabase }),
      TitleGenerator(latestMessage.content)
    ])
    title = generatedTitle
    const serviceSupabase = createServiceClient()
    
    // after() keeps the function alive on Vercel until this DB write finishes
after(
  Promise.all([
    UpdateChatSessionDetails({ id: sessionId, userId, title, supabase: serviceSupabase })
      .then((data) => console.log("✅ title updated:", data))
      .catch(err => console.error("❌ title update failed:", err)),
    UplaodChatMessageDetails({ sessionId:sessionId, message: latestMessage.content, role: "user", supabase: serviceSupabase })
      .then((data) => console.log("✅ user message saved:", data))
      .catch(err => console.error("❌ user message failed:", err))
  ])
)
  } else {
    const serviceSupabase = createServiceClient()
    after(
      UplaodChatMessageDetails({ sessionId, message: latestMessage.content, role: "user", supabase : serviceSupabase })
        .catch(err => console.error("message save failed:", err))
    )
  }

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages,
    onFinish: async ({ text }) => {
      try {
        await UplaodChatMessageDetails({ sessionId, message: text, role: "assistant", supabase })
      } catch (err) {
        console.error("assistant save failed", err)
      }
    }
  })
  return result.toTextStreamResponse({
    headers: {
      ...(isNew && {"x-chat-title": title,"x-chat-status": "success"}),
      "x-chat-status": "success"
    }
  })
}