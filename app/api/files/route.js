
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
    const userId= user.id
    const data = await req.formData()
    const file = data.get("file")
    console.log("file recieved", file)
    if (!file){
      return
    }
    console.log("before pdfparse")
    const fileId = randomUUID()
    const context ={
      userId,
      fileId
    }
    try{
      const docs = await parsePdf(file)
  
    const chunkedDocs = await chunkDoc(docs)
  
    const embeddedChunks = await embedChunk(chunkedDocs,context.fileId,context.userId)
    
    // Sending response to the frontend
    return Response.json({status:true, message:"success"})
  }catch(e){
    return Response.json({status: false, message:"something went wrong"})
  }

}