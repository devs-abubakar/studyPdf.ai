import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

export async function chunkDoc(docs){

    const documents = [
    new Document({ pageContent: docs }),
    ];
    const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
    separators: ["\n\n", "\n", ".", " ", ""],
    });
    const chunks = await splitter.splitDocuments(documents)
    return chunks
}