import { ChatGroq } from "@langchain/groq";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "meta-llama/llama-4-scout-17b-16e-instruct",
});

const testTool = tool(
  async ({ query }) => {
    return `You searched for: ${query}`;
  },
  {
    name: "test_search",
    description: "Test tool",
    schema: z.object({ query: z.string() }),
  }
);

const llmWithTools = llm.bindTools([testTool]);
const response = await llmWithTools.invoke([{ role: "user", content: "search for hello" }]);
console.log(response.tool_calls); // Should show the tool call