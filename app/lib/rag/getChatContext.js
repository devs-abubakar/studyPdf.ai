export async function getChatContext({sessionId,query,supabase}){
    try{
        console.log("get chat context hit ======== ")
        const {data:sessionFiles , error} = await supabase.from('session_files').select('file_id,created_at').eq("session_id",sessionId)
        if (error){
            console.error(error)
            return {status : false , message:error.message}
        }
        console.log(sessionFiles)
        console.log(query)
        if (!sessionFiles) return
        return sessionFiles
    }catch(err){
        console.error("Failed to read data",err)
        return {status : false , message:"failed to read data "}
    }

} 