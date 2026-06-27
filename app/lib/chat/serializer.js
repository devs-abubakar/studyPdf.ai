export default function toLLMMessages(messages){
    console.log("Incoming messages toLLMMessages",messages)
    const cleanedMessages = messages.map((msg)=>({role:msg.role,content:msg.content,tool_call:msg.tool_call}))
    console.log(cleanedMessages) 
    return cleanedMessages 

} 