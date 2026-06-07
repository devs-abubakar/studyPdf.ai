import { AIMessage, HumanMessage, SystemMessage, ToolMessage } from "@langchain/core/messages"
import { messagesStateReducer , Annotation } from "@langchain/langgraph"


export function convertToLangChainMessages(messages){
    console.log("Messages before langchain format",messages)
    const langChainformattedMessages = messages.map((msg)=>{
        console.log("messages came to langchain format",msg)
        if(!msg || !msg.role){ 
          console.warn("Messages are empty or no role",msg)
          return null
        }
        if(msg.role === "user"){
            return new HumanMessage(msg.content)
        }
        if(msg.role === "assistant"){
            return new AIMessage(msg.content)
        }
        if(msg.role === "system"){
            return new SystemMessage(msg.content)
        }
        if(msg.role === "tool"){
          console.log("message role is tool",msg)
          if(!msg.tool_call_id){
            throw new Error("missing tool call id",JSON.stringify(msg))
          }
          return new ToolMessage({
            content:msg.content,
            tool_call_id:msg.tool_call_id
          })
        }
        return null 
    }).filter(Boolean)
    console.log("messages after langchain format",langChainformattedMessages)
    return langChainformattedMessages
}

export function convertFromLangChainMessages(messages) {
  if (!Array.isArray(messages)) return []

  return messages.map((msg) => {
    const type = msg._getType?.()
    
    const roleMap = {
      human: "user",
      ai: "assistant",
      system: "system",
      tool: "tool",
    }
  
    return {
      role: roleMap[type] ?? "user",
      content:typeof msg.content === "string"
    ? msg.content
    : JSON.stringify(msg.content ?? {})
    }
})}
export const GraphState = Annotation.Root({
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
});