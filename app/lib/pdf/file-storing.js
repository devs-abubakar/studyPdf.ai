import { createClient } from '@/app/lib/supabase/server'

async function uploadFileDetails({
  supabase,
  fileId,
  userId,
  storageDataPath,
  fileName,
}) {
  const { data, error } = await supabase
    .from("files")
    .insert({
      id: fileId,
      user_id: userId,
      file_url: storageDataPath,
      file_name: fileName,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

async function uploadSessionFileDetails({
  supabase,
  sessionId,
  fileId,
}) {
  const { data, error } = await supabase
    .from("session_files")
    .insert({
      file_id: fileId,
      session_id: sessionId,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function storeFile(file,userId,sessionId){
    const supabase = await createClient()
    const fileExt = file.name.split(".").pop()
    const fileId = crypto.randomUUID();
    const filepath = `${userId}/${fileId}.${fileExt}`
    try{
        
        const {data:storageData,error:storageError} = await supabase.storage.from("studyPdfFiles").upload(filepath,file)
        
        if (storageError){
            console.error("error : ",storageError)
            throw new Error("Upload Failed")
        }
    const {data:fileData,error:dbError } = await uploadFileDetails({
        supabase,
        fileId,
        userId,
        storageDataPath: storageData.path,
        fileName: file.name,
      })
    const result = await uploadSessionFileDetails({
        supabase,
        sessionId,
        fileId,
      })
    

        if (dbError){
            throw new Error(dbError.message)
        }
        return {success:true, message:fileData}
    }catch(e){
        console.error("Db storing failed",e)
        return {success : false , error:e.message || "failed to save file in DB try again"}
    }

}