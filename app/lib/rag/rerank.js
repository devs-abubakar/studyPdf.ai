export async function rerankChunks(query,chunks,topN=5){
    console.log("----Jina rerank chunks hit------")
    console.log("========Chunks before entering jina=====",chunks)
    const response = await fetch("https://api.jina.ai/v1/rerank",{
        method:"POST",
        headers:{
            'Content-Type' :'application/json',
            'Authorizer' : `Bearer ${process.env.JINA_API_KEY}`
        },
        body: JSON.stringify({model: "jina-reranker-v2-base-multilingual",query,documents : chunks.map((c)=>({text:c.content,id:c.id})),top_n:topN})
    })
    console.log(response)
    if(!response.ok){
        console.error("Jina rerank failed")
        return chunks.slice(0,5)
    }
    const data = await response.json()
    console.log("Data returned from jina is :",data)
}