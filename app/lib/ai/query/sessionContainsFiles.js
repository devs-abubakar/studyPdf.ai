export async function hasFiles(sessionId,supabase){
    try{
        const {count, error} = await supabase.from('session_files').eq('session_id',sessionId).select('*',{count:"exact",head:true})
        if(error){
            console.error(error)
            return false
        }
        return count > 0
    }catch(err){
        console.error(err)
        return false
    }
}