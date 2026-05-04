import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

export async function chunkDoc(docs){
    const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
    separators: ["\n\n", "\n", ".", " ", ""],
    });
    const docArray = Array.isArray(docs) ? docs : [docs];
    const chunks = await splitter.splitDocuments(docArray)
    console.log("Chunked docs",chunks)
    return chunks
}