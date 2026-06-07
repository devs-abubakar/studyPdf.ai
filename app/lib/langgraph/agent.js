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
  .addConditionalEdges("agent",shouldContinue,{
    tools:"tools",
    __end__:"__end__"
  })
  .addEdge("tools","agent")
  return workFlow.compile()
}
export async function* streamAgentResponse(agent, messages, sessionId) {
  const stream = await agent.stream(
    { messages },
    
    {
      streamMode: ["messages", "tools"],
    }
  );


  for await (const [mode, data] of stream) {

    if (mode === "messages") {
      const [message] = data;
      if (!message) continue;

      const isAIMessage = message?.content && typeof message.content =="string" && message._getType?.() =="ai";
      if (isAIMessage){
        yield{
          type:"token",
          content:message.content
        }
      }
    }
    if (mode === "tools") {
      if (data.event === "on_tool_start") {
        yield{
          type:"tool_start",
          toolName:data.name
        }
      }
      if (data.event === "on_tool_event"){
        yield{
          type:"tool_progress",
          toolName: data.name,
          progress: data.data
        }
      }
      if (data.event ==="on_tool_end"){
        yield{
          type:"tool_end",
          toolName:data.name
        }
      }
      if (data.event === "on_tool_error") {
        yield {
          type: "tool_error",
          toolName: data.name,
          error: data.error,
        };
      }
    }
  }
  yield { type: "done" };
}


