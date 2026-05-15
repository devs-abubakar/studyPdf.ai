import { ChatGroq } from "@langchain/groq";

export default async function chatGroq(messages){
    const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    streaming:true
})
    
    const llmResponse  =await llm.invoke(messages)
    console.log("llm response--->",llmResponse)
    return llmResponse.content
}