import {ChatGroq} from "@langchain/groq"
import { createAgentTools } from "./tools";
import { GraphState } from "./state";
import {StateGraph,START} from "@langchain/langgraph"
import { createAgentNode, createToolsNode, shouldContinue } from "./nodes";

const LLM_CONFIG = {
  model: "meta-llama/llama-4-scout-17b-16e-instruct",
  temperature: 0.7,
  maxRetries: 2,
};

export async function createDocumentAgent(supabase,sessionId){
  const llm =new ChatGroq({
    apiKey:process.env.GROQ_API_KEY,
    ...LLM_CONFIG
  })

  const tools = createAgentTools(supabase,sessionId)
  const llmwithtools = llm.bindTools(tools)
  const agentNode = createAgentNode(llmwithtools)
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
  const stream = await agent.stream(
    { messages },
    {
      configurable: { thread_id: sessionId },
      streamMode: "values",
    }
  );
  
  for await (const chunk of stream) {
    const lastMessage = chunk.messages?.[chunk.messages.length - 1];
    
    if (lastMessage && lastMessage.content && typeof lastMessage.content === "string") {
      yield {
        content: lastMessage.content,
        isToolCall: false,
      };
    }
    
    if (lastMessage?.tool_calls?.length > 0) {
      yield {
        toolCalls: lastMessage.tool_calls,
        isToolCall: true,
      };
    }
  }
}

export async function runAgentAndCollectResponse(agent, messages, sessionId) {
  let fullResponse = "";
  
  const stream = await agent.stream(
    { messages },
    {
      configurable: { thread_id: sessionId },
      streamMode: "values",
    }
  );
  
  for await (const chunk of stream) {
    const lastMessage = chunk.messages?.[chunk.messages.length - 1];
    
    if (lastMessage?.content && typeof lastMessage.content === "string") {
      fullResponse = lastMessage.content; // Replace with latest (streaming not needed for collection)
    }
  }
  
  return fullResponse || "I couldn't generate a response. Please try again.";
}