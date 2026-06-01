import { embeddings } from "../ai/geminiEmbedding"

export async function getChatContext({sessionId,query,supabase}){
    
    try{
        console.log("get chat context hit ======== ")
        const [embeddedQuery,{data:sessionFiles,error}]=await Promise.all([
            embeddings.embedQuery(query),
            supabase.from('session_files').select('file_id,created_at').eq("session_id",sessionId)
        ])
        if (error){
            console.error(error)
            return {status : false , message:error.message}
        }
        console.log(sessionFiles)
        console.log(query)
        console.log("=====checking file ids now=======")
        const fileIds = sessionFiles.map((file)=>file.file_id)
        if(!fileIds?.length){
            console.log("=====no file ids found=======")
            console.log("no file ids found")
            return {status:true,chunks:[], message:"no relevant chunks"}
        }
        const {data , error:vectorDbError} = await supabase.rpc("match_documents", {
  query_embedding: embeddedQuery,
  file_ids: fileIds,
  match_count: 8
});
        if(vectorDbError){
            console.log("=======vector db error=======",vectorDbError)
            return{status:false , message:"vector search failed"}
        }
        console.log("======data of the vector search========",data)
        return data
    }catch(err){
        console.error("Failed to read data",err)
        return {status : false , message:"failed to read data "}
    }

} 