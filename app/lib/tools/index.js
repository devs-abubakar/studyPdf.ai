import { createChatContextTool } from "./getChatContextTool";

export const createTools = (supabase, sessionId) => ({
  getChatContext: createChatContextTool(supabase, sessionId)
})