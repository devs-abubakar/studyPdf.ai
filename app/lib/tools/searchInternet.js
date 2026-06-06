import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const searchTool = tool(
  async ({ query }) => {
    console.log(`[Tool] Triggering Tavily Search for: "${query}"`);
    
    try {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query: query,
          max_results: 5,
        }),
      });

      const data = await response.json();
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