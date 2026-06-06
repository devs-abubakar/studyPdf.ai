import {ChatGroq} from "@langchain/groq"
import { createAgentTools } from "./tools";
import { GraphState } from "./state";
import {StateGraph,START} from "@langchain/langgraph"
import { createAgentNode, createToolsNode, shouldContinue } from "./nodes";
import { AIMessageChunk } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


const PRIMARY_CONFIG = {
  model: "llama-3.3-70b-versatile",
  temperature: 0.7,
  maxRetries: 2,
};
const FALLBACK_CONFIG = {
  model: "gemini-2.5-flash",
  temperature: 0.3,
  maxRetries: 1,
};

export async function createDocumentAgent(supabase,sessionId){
  const primaryLLM =new ChatGroq({
    maxTokens:4096,
    apiKey:process.env.GROQ_API_KEY,
    ...PRIMARY_CONFIG
  })

  const fallbackLLM = new ChatGoogleGenerativeAI({
    apiKey:process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    ...FALLBACK_CONFIG
  })

  const tools = createAgentTools(supabase,sessionId)
  const primaryWithTools = primaryLLM.bindTools(tools);
  const fallbackWithTools = fallbackLLM.bindTools(tools);

  const agentNode = createAgentNode(primaryWithTools,fallbackWithTools)
  const toolsNode = createToolsNode(tools)

  const workFlow = new StateGraph({channels:GraphState})
  .addNode("agent",agentNode)
  .addNode("tools",toolsNode)
  .addEdge(START,"agent")
  .addConditionalEdges("agent",shouldContinue)
  .addEdge("tools","agent")
  return workFlow.compile()
}
export async function* streamAgentResponse(agent, messages, sessionId) {
  console.log("messages in streamAgentRespons",messages)
  const stream = await agent.stream(
    { messages },
    {
      configurable: { thread_id: sessionId },
      streamMode: "messages",
    }
  );
  
  let fullText = ""
  let toolStarted=false

  for await (const [message, metadata] of stream) {
    // guard — skip undefined/null chunks
    if (!message) continue

    const isAIChunk = message instanceof AIMessageChunk
    if (!isAIChunk) continue  

    const hasText = typeof message.content === "string" && message.content.length > 0
    const hasToolCall = (message.tool_calls?.length ?? 0) > 0 || (message.tool_call_chunks?.length ?? 0) > 0

    if (hasToolCall && !toolStarted) {
      toolStarted = true
      const toolName = message.tool_calls?.[0]?.name
                    ?? message.tool_call_chunks?.[0]?.name
                    ?? "searchUserDocuments"
      yield { type: "tool_start", toolName }
    }

    if (!hasToolCall && toolStarted) {

      toolStarted = false
      yield { type: "tool_end" }
    }

    if (hasText && !hasToolCall) {
      fullText += message.content
      yield { type: "token", content: message.content }
    }
  }


  yield { type: "done", fullText }
}
