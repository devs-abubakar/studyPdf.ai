export async function UploadChatMessageDetails({message,role,sessionId,supabase}){
    try{
        const {data, error} = await supabase.from("chat_messages").insert({session_id:sessionId,content:message,role:role})
        if (error){
            return{success:false, error: error}
        }
        return{success:true, message: data}
    }catch(e){
        console.error("An error occured :",e)
        return {success: false ,error: e?.message || e}
    }

}