import { create } from "zustand";

export const useChatStore = create((set,get)=>({

  messages : [],
  activeChat : null,

  setActiveChat :(chatId)=>set({activeChat : chatId}),

  recentChats : [
  ],
  createNewChat : ((title)=>{
    const newChat = {
      id :Date.now(),
      title:title,
    }
    set((state) => ({
      messages: [],
      activeChat: newChat.id,
      }))
  }),

  addMessage : (role,content) => {
    set((state) => ({
     messages:[...state.messages,{role : role,content : content}]
    }))
  }
}))