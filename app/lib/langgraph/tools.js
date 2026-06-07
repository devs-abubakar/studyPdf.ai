import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getChatContext } from "@/app/lib/rag/getChatContext";
import { searchTool } from "../tools/searchInternet";
import { PdfSchema } from "../pdf/pdf-schema";

export function createDocumentSearchTool(supabase, sessionId) {
  return tool(
    async function* ({ query }) {
        
        if (!query || query.trim().length === 0) {
          yield {
            status: "Query is empty. No question to search for."
          }
        }
        console.log(`[Tool] Searching documents for: "${query}"`);
      yield {
        status:"Searching for docs"
      }
      const result = await getChatContext({ 
        sessionId, 
        query, 
        supabase 
      });
      
      // Format response for LLM consumption
      if (!result || result.length === 0) {
        yield{
          status:"No docs found"
        }
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

export const createPdfTool = tool(
  async (input) =>{
    console.log("Ai input for the pdf",input)
    
    const res = await fetch("api/pdf/generate",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(input)
    })
    const metadata = await res.json()
    console.log("response from generated route",metadata)
    return JSON.stringify({
      status: "success",
      pdfData: input
    });
  },
  {
    name: "create_pdf",
    description: "Strictly limit it's use because it is costly. Use this tool when you don't have any other option and the user asks to create downloadable PDFs only.",
    schema: PdfSchema
  }
);

export function createAgentTools(supabase, sessionId) {
  return [createDocumentSearchTool(supabase, sessionId),searchTool,createPdfTool];
}