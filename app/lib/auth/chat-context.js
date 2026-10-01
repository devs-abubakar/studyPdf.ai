import { createClient } from "@/app/lib/supabase/server"

export async function getChatContext(params) {
  const supabase = await createClient()

  const { data: { user }, error } =
    await supabase.auth.getUser()

  if (error || !user) {
    throw new Error("UNAUTHORIZED")
  }

  const resolvedParams = await params
  const sessionId = resolvedParams.id

  if (!sessionId) {
    throw new Error("CHAT_NOT_FOUND")
  }

  return {
    supabase,
    user,
    userId: user.id,
    sessionId,
  }
}