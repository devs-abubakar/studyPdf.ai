import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { messagesStateReducer } from "@langchain/langgraph"

export function convertToLangChainMessages(messages){
    console.log("Messages before langchain format",messages)
    const langChainformattedMessages = messages.map((msg)=>{
        if(msg.role === "user"){
            return new HumanMessage(msg.content)
        }
        if(msg.role === "assistant"){
            return new AIMessage(msg.content)
        }
        if(msg.role === "system"){
            return new SystemMessage(msg.content)
        }
        return null 
    }).filter(Boolean)
    console.log("messages after langchain format",langChainformattedMessages)
    return langChainformattedMessages
}

export function convertFromLangChainMessages(messages) {

  if (!Array.isArray(messages)) return [];
  
  const frontendFormattedMessages = messages.map((msg) => ({
    role: msg._getType ? msg._getType() : (msg.constructor?.name === "AIMessage" ? "assistant" : "user"),
    content: msg.content,
  }));
  console.log("frontend formatted messages",frontendFormattedMessages)
  return frontendFormattedMessages;
}
export const GraphState = {
  messages: {
    value: messagesStateReducer,
    default: () => [],
  },
};