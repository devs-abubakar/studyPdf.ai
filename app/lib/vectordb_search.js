import { embeddings } from "./geminiEmbedding"
export async function searchVectorDb(query){
    const vectorQuery = await embeddings.embedQuery(query)
    
}