export default function toLLMMessages(messages){
    const cleanedMessages = messages.map((msg)=>({role:msg.role,content:msg.content,tool_call:msg.tool_call})) 
    return cleanedMessages 

} 