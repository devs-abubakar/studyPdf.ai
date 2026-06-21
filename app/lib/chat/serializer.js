export default function toLLMMessages(messages){
    console.log("Incoming messages toLLMMessages",messages)
    return messages.map((msg)=>{msg.role,msg.content,msg.tool_calls})

} 