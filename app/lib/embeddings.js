import { randomUUID } from "crypto";
import { embeddings } from "./geminiEmbedding";

export async function embedChunk(chunks){
    const fileId = randomUUID()
    const texts = chunks.map(chunk => chunk.pageContent);
    const vectors = await embeddings.embedDocuments(texts);
    const embedding_details = chunks.map((chunk, i) => ({
    id: `${fileId}_chunk_${i}`,
    file_id: fileId,
    content: chunk.pageContent,
    embedding: vectors[i],
    }));

    return embedding_details
}