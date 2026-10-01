
export async function UploadChatSessionDetails({id,userId,title,supabase,persisted}){
    try{
        console.log("session id entered the upload session details",id)
        const {data,error} = await supabase.from('chat_sessions').insert({id:id,user_id:userId,title:title,persisted:persisted}).select().single()
        if(error){
            console.error(error.message)
            return{success:false, error:error.message}
        }
        console.log("data of the upload session details is ===>",data)
        return {success:true, message:data.persisted}
    }catch(e){
        console.error("An error occured ", e)
        return {success:false,error:e?.message || e}
    }
}

export async function UpdateChatSessionDetails({id,userId,title,supabase}){
    try{
        const {data,error} = await supabase.from("chat_sessions").update({title:title}).eq("id",id).eq('user_id',userId).select()
        if(error){
            console.error(error)
            return
        }
        return data
    }catch(err){
        console.error(err)
        return 
    }
}

export async function deleteChatSession({ id, supabase, userId }) {
  try {
    console.log("the user id is ", userId)
    console.log("the chat session id is ", id)
    const { data, error } = await supabase
      .from("chat_sessions")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select()

    if (error) {
      console.error("Error deleting chat session:", error)
      throw error
    }

    console.log("Data of deletion is ==>", data)

    return data
  } catch (err) {
    console.error("deleteChatSession failed:", err)
    throw err
  }
}

export async function updateTitle({ id, title, supabase, userId }) {
  try {
    const { data, error } = await supabase
      .from("chat_sessions")
      .update({ title: title })
      .eq("id", id)
      .eq("user_id", userId)
      .select()

    if (error) {
      console.error("Error updating title:", error)
      throw error
    }

    return data
  } catch (err) {
    console.error("updateTitle failed:", err)
    throw err
  }
}