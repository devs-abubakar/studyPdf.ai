import { ChatGroq } from "@langchain/groq";
import { searchVectorDb } from "./vectordb_search";
export default async function chatGroq(messages){
    const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
})
    
    const llmResponse  =await llm.invoke(messages)
    console.log(llmResponse)
    return llmResponse.content
}