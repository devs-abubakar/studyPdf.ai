import chatGroq from "@/app/lib/chat_openai"
import {userChatHistory, assistantChatHistory} from "@/app/lib/messages"
import { NextResponse } from "next/server"
import  searchVectorDb  from "@/app/lib/rag/vectordb_search"
import { vectorStore } from "@/app/lib/rag/vectorStore"
import { maximalMarginalRelevance } from "@langchain/core/utils/math";

export async function POST(req){
    const data =await req.json()
    const query = data.message
    const message = userChatHistory(query)
    const fetchK = 20
    const retriever = vectorStore.asRetriever({
  k: 10,
  verbose: true,
  searchType: 'mmr',
  searchKwargs: { alpha: 0.5 },
});
    const results =await retriever.invoke(query)
    console.log("retriever Search Results:", results); 

    if (!results || results.length === 0) {
      return NextResponse.json({
        status: false,
        response: "No relevant context found in knowledge base."
      });
    }
    const context = results.map(c=>c.pageContent).join("/n/n")

    const prompt = `
    You are a helpful assistant.

    Use ONLY the context below to answer.

    Context:
    ${context}

    Question:
    ${query}

    Answer in under 200 words.
    `;
    const chatResponse = await chatGroq(prompt)
    assistantChatHistory(chatResponse)
    return NextResponse.json({status : true,response : chatResponse})
}