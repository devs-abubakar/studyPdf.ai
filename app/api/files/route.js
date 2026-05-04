
import { randomUUID } from "crypto";
import { chunkDoc } from "@/app/lib/chunking";
import { embedChunk } from "@/app/lib/embeddings";
import { parsePdf } from "@/app/lib/pdf-parser";

export async function POST(req){
    console.log("api hit")
    const data = await req.formData()
    const file = data.get("file")
    console.log("file recieved", file)
    if (!file){
      return
    }
    console.log("before pdfparse")
    const docs = await parsePdf(file)
    console.log("after pdfparse")
    console.log(docs)
    const chunkedDocs = await chunkDoc(docs)
    console.log(chunkedDocs)
    const fileId = randomUUID()
    const embeddedChunks = await embedChunk(chunkedDocs,fileId)
    // Sending response to the frontend
    return Response.json({totalChunks : embeddedChunks.length, preview : embeddedChunks})

}