import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const searchTool = tool(
  async function* ({ query }) {
    console.log(`[Tool] Triggering Tavily Search for: "${query}"`);
    
    try {
      yield {
        status: "Searching the internet"
      }
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({api_key: process.env.TAVILY_API_KEY,
          query: query,
          max_results: 5,})
        ,
      });
      yield {
        status : "Formatting data"
      }
      const data = await response.json();
      console.log("result of search without format :",data)
      const formattedResult = data.results.slice(0,5).map((rslt,ind)=>`[Result ${ind + 1 } ] Title:${rslt.title} Url:${rslt.url} Published:${rslt.published_date ?? "unknown"} summary:${rslt.content}`).join('\n\n')
      const ToolOutput = `Search result as of ${new Date().toISOString()}:\n\n${formattedResult}`
      console.log("result of search with format :",formattedResult)
      return JSON.stringify(data);
    } catch (error) {
      console.error("[Tool Error] Tavily search failed:", error);
      return "The internet search engine failed to retrieve results.";
    }
  },
  {
    name: "searchInternet",
    description: `Search the internet for current information, real-time data, and global history updates. 
    Use ONLY when the requested information is not available in the uploaded documents or requires current ${Date.now()} data.`,
    schema: z.object({
      query: z.string().describe("The specific search query to look up on the internet"),
    }),
  }
);