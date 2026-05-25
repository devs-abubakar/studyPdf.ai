import { createClient } from '@/app/lib/supabase/server'
export async function storeFile(file,userId){
    const supabase = await createClient()
    const fileExt = file.name.split(".").pop()
    const filepath = `${userId}/${crypto.randomUUID()}.${fileExt}`
    try{
        
        const {data:storageData,error:storageError} = await supabase.storage.from("studyPdfFiles").upload(filepath,file)
        
        if (storageError){
            console.error("error : ",storageError)
            throw new Error("Upload Failed")
        }

        const {data:fileData , error:dbError } = await supabase.from("files").insert({
            user_id:userId,
            file_url:storageData.path,
            file_name:file.name,
        }).select().single()

        if (dbError){
            throw new Error(dbError.message)
        }
        return {success:true, message:fileData}
    }catch(e){
        console.error("Db storing failed",e)
        return {success : false , error: "failed to save file in DB try again"}
    }

}