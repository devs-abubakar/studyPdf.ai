export async function SessionHasFiles(supabase,sessionId){
    const {data,error} = await supabase.from("chat_sessions")
    
}