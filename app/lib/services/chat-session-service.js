
export async function UploadChatSessionDetails({id,userId,title,supabase}){
    try{
        console.log("session id entered the upload session details",id)
        const {data,error} = await supabase.from('chat_sessions').insert({id:id,user_id:userId,title:title}).select().single()
        if(error){
            console.error(error.message)
            return{success:false, error:error.message}
        }
        console.log("data of the upload session details is ===>",data)
        return {success:true, message:data}
    }catch(e){
        console.error("An error occured ", e)
        return {success:false,error:e?.message || e}
    }
}