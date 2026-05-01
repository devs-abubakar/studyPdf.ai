import fs from "fs";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import path from "path";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";


export async function GET(req){
    // Creating embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-001"
    });
    const text = "hello world"

    const embedding_details = []

    const vector = await embeddings.embedQuery(text)
    console.log("=======vector hello start =======")
    console.log(vector)
    console.log("=======vector hello end =======")


    // Testing a local file
    const filePath = path.join(process.cwd(), "sample.pdf");
    
    // Loading the file
    const loader =new PDFLoader(filePath)
    const docs = await loader.load()


    // Splitting(chunking) the file 
    const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
    separators: ["\n\n", "\n", ".", " ", ""],
    });
    const chunks = await splitter.splitDocuments(docs)
    console.log(chunks)


    // Saving embeddings to an array
    const fileId = `${filePath}_${Date.now()}`;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      const vector = await embeddings.embedDocuments([chunk.pageContent]);

      embedding_details.push({
        id: `${fileId}_chunk_${i}`,
        file_id: fileId,
        content: chunk.pageContent,
        embedding: vector,
      });
    }

    // Sending response to the frontend
    return Response.json({totalChunks : chunks.length, preview : chunks})

}