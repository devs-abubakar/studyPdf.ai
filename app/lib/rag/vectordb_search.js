import { embeddings } from "../ai/geminiEmbedding"
export default async function searchVectorDb(embeddedChunks){
    const retriever = embeddedChunks.asRetriever({
    searchType: "mmr",
    k: 5,
})
    const context =await retriever.invoke("what is the topic of the pdf")
    return context
}