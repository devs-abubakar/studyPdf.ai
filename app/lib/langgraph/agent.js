import {ChatGroq} from "@langchain/groq"
import { createAgentTools } from "./tools";
import { GraphState } from "./state";
import {StateGraph,START} from "@langchain/langgraph"
import { createAgentNode, createToolsNode, shouldContinue } from "./nodes";
import { AIMessageChunk } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


const FALLBACK_CONFIG = {
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  model: 'meta-llama/llama-3-8b-instruct:free',
};
const PRIMARY_CONFIG = {
  model: "gemini-2.5-flash",
  temperature: 0.3,
  maxRetries: 1,
};

export async function createDocumentAgent(supabase,sessionId){
  const fallbackLLM =new ChatGroq({
    maxTokens:4096,
    apiKey:process.env.GROQ_API_KEY,
    ...FALLBACK_CONFIG
  })

  const primaryLLM = new ChatGoogleGenerativeAI({
    apiKey:process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    ...PRIMARY_CONFIG
  })

  const tools = createAgentTools(supabase,sessionId)
  const primaryWithTools = primaryLLM.bindTools(tools);
  const fallbackWithTools = fallbackLLM.bindTools(tools);

  const agentNode = createAgentNode(primaryWithTools,fallbackWithTools)
  const toolsNode = createToolsNode(tools)

  const workFlow = new StateGraph(GraphState)
  .addNode("agent",agentNode)
  .addNode("tools",toolsNode)
  .addEdge(START,"agent")
  .addConditionalEdges("agent",shouldContinue)
  .addEdge("tools","agent")
  return workFlow.compile()
}
export async function* streamAgentResponse(agent, messages, sessionId) {
  const stream = await agent.stream(
    { messages },
    {
      streamMode: ["messages", "updates"],
    }
  );

  let activeToolName = null;

  for await (const [mode, data] of stream) {

    if (mode === "messages") {
      const [message, metadata] = data;
      if (!message) continue;

      const isAIChunk = message instanceof AIMessageChunk;
      if (!isAIChunk) continue;

      const toolCallName = message.tool_calls?.[0]?.name; 
        if (toolCallName && !activeToolName) {
        activeToolName = toolCallName;
        yield { type: "tool_start", toolName: toolCallName };
      }

      // Only stream tokens during actual generation (not during tool calls)
      const hasText =
        typeof message.content === "string" &&
        message.content.length > 0;

      if (hasText && !activeToolName) {
        yield { type: "token", content: message.content };
      }
    }

    // ─── UPDATES mode: node completion events ─────────────────────────
    else if (mode === "updates") {
      const nodeName = Object.keys(data)[0];

      if (nodeName === "tools") {
        // Tool just finished — NOW emit tool_end with the real result name
        const resultName = data.tools?.messages?.[0]?.name ?? activeToolName;
        yield { type: "tool_end", toolName: resultName };
        activeToolName = null;   // reset for next tool call

      } else if (nodeName === "agent") {
        // Only emit agent status if it's not just a tool-calling step
        const agentMessages = data.agent?.messages ?? [];
        const lastMsg = agentMessages[agentMessages.length - 1];
        const isToolCall = lastMsg?.tool_calls?.length > 0;

        if (!isToolCall) {
          yield { type: "status", message: "Agent finished." };
        }
      }
    }
  }

  yield { type: "done" };
}


