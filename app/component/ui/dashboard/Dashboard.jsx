"use client"
import { consumeCallback } from '@langchain/core/callbacks/promises'
import React,{useState} from 'react'

const Dashboard = () => {
  const [selectedFile,setSelectedFile] = useState(null)
  const [previewUrl,setPreviewUrl] = useState(null)
  const [chat,setChat]= useState(null)
  const handleChat = async ()=>{
    if (!chat){
      return
    }
    console.log(chat)
    try{

      const res = await fetch('/api/chat',{
        method: "POST",
        headers : {
          "Content-Type": "application/json",
        },
    body: JSON.stringify({ message: chat }),  
  })
  console.log(res.ok)
  try{
    const data = await res.json()
    console.log(data.response)
  }catch(e){
    console.log(`Something went wrong ${e}`)
  }
    }catch(e){
      console.log(`Error ${e} occured`)
    }
  }
  
  const handleFileUpload= async()=>{
    if(!selectedFile) return;
    try{

      const formData = new FormData()
      formData.append('file',selectedFile)
      const res = await fetch('api/files',{
        method:"POST",
        body : formData
      })
      if (res.ok){
        console.log("upload succesfull")
      }
    }catch(err){
      console.log(`Something went wrong ${err}`)
    }
  }

    const handleChangeFile=(e)=>{
        const file =e.target.files[0]
        if (!file){
            return
        }
        setPreviewUrl(URL.createObjectURL(file))
        console.log(file)
        setSelectedFile(file)
    }
    async function testChunk(){
      const res =await fetch("/api/files")
      const data =await res.json()   
      console.log(data)
      console.log(data.preview)
    }

    return (


    <div className='w-screen h-screen flex justify-center items-center'>
            <label >Select a file:</label>
            <input type="file" className='w-auto h-auto p-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white' onChange={handleChangeFile} id="myFile" accept="*"  name="filename" />
            <input type="submit" onClick={handleFileUpload} value="Upload" className='w-auto h-auto p-3 mx-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white' />
            {selectedFile && previewUrl &&(
                <div>
                    <img src={previewUrl} alt="preview" style={{width: "200px"}}/>
                    <strong>File Name : {selectedFile.name}</strong>
                    <br></br>
                    <strong>File Size : {(selectedFile.size/1024).toFixed(2)}kb</strong>
                </div>
            )}
            <button onClick={testChunk} className='w-auto h-auto p-3 rounded-2xl bg-stone-900 hover:bg-stone-800 mx-2 text-white'>chunk test</button>
            <textarea name="chat" id="chat" onChange={(e)=>setChat(e.target.value)} className='bg-stone-300 text-3xl'></textarea>
            <button onClick={handleChat} className='w-auto h-auto p-3 rounded-2xl bg-stone-900 hover:bg-stone-800 mx-2 text-white' >submit chat </button>
    </div>  
  )
}

export default Dashboard