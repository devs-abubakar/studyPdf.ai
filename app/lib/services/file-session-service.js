export async function UploadFileSessionDetails(sessionId,fileId,supabase){
    try{
        const {data, error} = await supabase.from("file_sessions").insert({file_id:fileId,session_id:sessionId})
    if(error){
            console.error(error.message)
            return{success:false, error:error.message}
        }
        return {success:true, message:data}
    }catch(e){
        console.error("An error occured ", e)
        return {success:false,error:e?.message || e}
    }
}