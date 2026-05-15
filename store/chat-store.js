import { create } from "zustand";

export const useChatStore = create((set,get)=>({
  activeChat : null,

  setActiveChat :(chatId)=>set({activeChat : chatId}),
  recentChats : [
    {id:1,title:"Code explaination",messages : [{role:"assistant",content:"what can i help you with"}]},
    {id:2,title:"Debugging",messages : []},
    {id:3,title:"Working",messages : []},
  ],
  createNewChat : (()=>{
    const newChat = {
      id :Date.now(),
      title:"New Chat",
      messages:[]
    }
    set((state) => ({
      recentChats: [newChat, ...state.recentChats],
      activeChat: newChat.id,
      }))
  }),
  addMessage : (role,content) => {
    const activeChat = get().activeChat
    set((state) => ({
      recentChats : state.recentChats.map((chat)=>{
        if (chat.id === activeChat){
          return {...chat,messages : [...chat.messages,{role,content}]}
        }
        return chat
      })
    }))
  }
}))