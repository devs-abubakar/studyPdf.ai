
import { randomUUID } from "crypto";
import { chunkDoc } from "@/app/lib/rag/chunking";
import { embedChunk } from "@/app/lib/ai/embeddings";
import { parsePdf } from "@/app/lib/pdf/pdf-parser";
import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req){
    const supabase = await createClient()
    const {data:{user}} =await supabase.auth.getUser()
    console.log("api hit")
    if (!user){
      return NextResponse.json({status:401,message:"unauthorized user"})
    }
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
    const embeddedChunks = await embedChunk(chunkedDocs,fileId,user.id)
    // Sending response to the frontend
    return Response.json({totalChunks : embeddedChunks.length, preview : embeddedChunks})

}