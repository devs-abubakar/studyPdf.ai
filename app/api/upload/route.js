import { chunkDoc } from "@/app/lib/chunking";
import { embedChunk } from "@/app/lib/embeddings";
import { parsePdf } from "@/app/lib/pdf-parser";
import { NextResponse } from "next/server";
export async function POST(req){
    const data = await req.formData();

    const file = data.get("file");
    if(!file){
        return NextResponse.json({success:false})
    }
    if (file.type !== "application/pdf") {
    return NextResponse.json({
    success: false,
    error: "Only PDF files are supported",
    });
}
    console.log(file)
    const docs =await parsePdf(file)
    const chunkedDocs =await chunkDoc(docs)
    const embeddedChunk =await embedChunk(chunkedDocs)
    console.log('Embedded chunk is :',embeddedChunk)
    return NextResponse.json({success:true})
}