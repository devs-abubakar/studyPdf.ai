import { tool } from 'ai'
import { z } from 'zod'
import { getChatContext } from "@/app/lib/rag/getChatContext"

export const createChatContextTool = (supabase, sessionId) =>
  tool({
    description: 'Fetches relevant chunks from user uploaded documents or files in the session',
    inputSchema: z.object({                          // ← was `parameters` in v4
      query: z.string().describe('User question used to query documents'),
    }),
    execute: async ({ query }) => {
      console.log("tool hit:", query)
      return getChatContext({ sessionId, query, supabase })
    }
  })