import chatGroq from "@/app/lib/ai/chat_openai"
import { UploadChatSessionDetails } from "@/app/lib/services/chat-session-service"
import { NextResponse } from "next/server"

export async function POST(req){
    
    const { messages } =await req.json()
    console.log("query in the route data --->",messages)

//     const message = userChatHistory(query)
//     const fetchK = 20
//     const retriever = vectorStore.asRetriever({
//   k: 10,
//   verbose: true,
//   searchType: 'mmr',
//   searchKwargs: { alpha: 0.5 },
// });
//     const results =await retriever.invoke(query)
//     console.log("retriever Search Results:", results); 

//     if (!results || results.length === 0) {
//       return NextResponse.json({
//         status: false,
//         response: "No relevant context found in knowledge base."
//       });
//     }
//     const context = results.map(c=>c.pageContent).join("/n/n")

//     const prompt = `
//     You are a helpful assistant.

//     Use ONLY the context below to answer.

//     Context:
//     ${context}

//     Question:
//     ${query}

//     Answer in under 200 words.
//     `;
    const chatResponse = await chatGroq(messages)
    const {userId, title} = {userId:"dummy user for now", title:"dummy title for now"}
    const chatSession = await UploadChatSessionDetails(userId,title)
    console.log("chatResponse --->",chatResponse)
    return NextResponse.json({status : true,response : chatResponse})
}