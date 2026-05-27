
export async function UploadChatSessionDetails(userId,title,supabase){
    try{
        const {data,error} = await supabase.from('chat_sessions').insert({user_id:userId,title:title}).select().single()
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