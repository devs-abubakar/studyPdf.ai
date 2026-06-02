import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getChatContext } from "@/app/lib/rag/getChatContext";

export function createDocumentSearchTool(supabase, sessionId) {
  return tool(
    async ({ query }) => {
        
        if (!query || query.trim().length === 0) {
            return JSON.stringify({
                found: false,
                message: "Please provide a specific question about your documents.",
                chunks: []
            });
        }
        console.log(`[Tool] Searching documents for: "${query}"`);

      const result = await getChatContext({ 
        sessionId, 
        query, 
        supabase 
      });
      
      // Format response for LLM consumption
      if (!result || result.length === 0) {
        return JSON.stringify({
          found: false,
          message: "No relevant documents found. Please try a different query or upload more documents.",
          chunks: []
        });
      }
      
      return JSON.stringify({
        found: true,
        message: `Found ${result.length} relevant chunk(s)`,
        chunks: result
      }, null, 2);
    },
    {
      name: "searchUserDocuments",
      description: `Search through user's uploaded documents (PDFs, files) for relevant information.
      
      Use this tool when:
      - User asks about content in their uploaded files
      - User wants to find specific information in their documents
      - User says "find", "search", "look up", "what is in my document"
      
      Do NOT use for:
      - Greetings or casual conversation
      - Questions about the assistant itself
      - General knowledge questions`,
      schema: z.object({
        query: z.string().describe("The search query to look for in user's documents"),
      }),
    }
  );
}


export function createAgentTools(supabase, sessionId) {
  return [createDocumentSearchTool(supabase, sessionId)];
}