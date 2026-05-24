import { embeddings } from "./geminiEmbedding";
import { createClient } from '@/app/lib/supabase/server'

export async function embedChunk(chunks, fileId, userId) {
  const supabase = await createClient()
  const texts = chunks.map(c => c.pageContent);
  const vectors = await embeddings.embedDocuments(texts);
  
  try{
    const rows = chunks.map((chunk, i) => ({
      
      content: chunk.pageContent,
      metadata: {
      file_id:fileId,
      chunkId: i,
    },
    embedding: vectors[i],
    user_id: userId,
    
  }));
  try{
    const {data,error}=await supabase.from("documents").insert(rows);
    if(error){
      console.error("Error while uploading : ",error)
    }
    console.log("inserted Rows :",data)
  }catch(e){
    console.log("Error occured while uploading to supabase")
  }
}catch(e){
  console.log("error occured : ",e)
  return {status: false, message: e }
}
  console.log("it was success")
  return {status: true, message: "success" };
}