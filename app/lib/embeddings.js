
import { vectorStore } from "./vectorStore";

export async function embedChunk(chunks,fileId){
    const formattedDocs = chunks.map((chunk,id)=>({
        pageContent : chunk.pageContent,
        metadata : {
            fileId : fileId,
            chunkId: id,
        }
    }));
    console.log(formattedDocs)
    await vectorStore.addDocuments(formattedDocs)
    return { fileId, totalChunks: formattedDocs.length };
}