import { ToolNode } from "@langchain/langgraph/prebuilt";
import { SystemMessage } from "@langchain/core/messages";

const SYSTEM_PROMPT = `You are a helpful document analysis assistant. Your job is to help users find information in their uploaded documents.

## Guidelines

1. **Use the searchUserDocuments tool** when users ask about content in their files
2. **Always respond after receiving tool results** - never stop mid-conversation
3. **Be honest** - if no documents found, suggest uploading files or rephrasing
4. **Be conversational** - greet users naturally without always using the tool

## Response Format

- After tool results: "Based on your documents, I found..." or "I couldn't find anything about that in your documents."
- For greetings: "Hello! I can help you search through your documents. What would you like to find?"
- When no documents exist: "You haven't uploaded any documents yet. Please upload a PDF file first."

## Example Behaviors

User: "hello" → Respond naturally without using tool
User: "find information about climate change" → Use searchUserDocuments tool
User: "what's in my PDF" → Use searchUserDocuments tool`;


export function createAgentNode(llm){
    return async function agentNode(state){
        console.log("[Agent] processing with",state.messages.length,"messages")
        let messages = [...state.messages]
            const hasSystemPrompt = messages.some(
        (m) => m._getType?.() === "system"
        );
        
        if (!hasSystemPrompt) {
        messages = [new SystemMessage(SYSTEM_PROMPT), ...messages];
        }
        const response =await llm.invoke(messages)
            console.log("[Agent] Response:", {
      hasContent: !!response.content,
      contentLength: response.content?.length || 0,
      toolCalls: response.tool_calls?.length || 0
    });
        console.log("[Agent] response recieved, tool calls:",response.tool_calls?.length || 0)
        return {messages:[response]}
    }
}

export function shouldContinue(state){
    const lastMessage = state.messages[state.messages.length - 1]
    const hasToolCalls = lastMessage.tool_calls?.length>0

    if(hasToolCalls){
        console.log("[Agent] detected tool calls,routing to tool node")
        return "tools"
    }
    console.log("no tool calls")
    return "__end__"

}

export function createToolsNode(tools){
    return new ToolNode(tools)
}