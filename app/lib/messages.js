const messageHistory=[]
export function userChatHistory(content){
    messageHistory.push({role:"user",content:content})
    console.log(messageHistory)
    return messageHistory
}
export function assistantChatHistory(content){
    messageHistory.push({role:"assistant",content:content})
    console.log(messageHistory)
    return messageHistory
}

