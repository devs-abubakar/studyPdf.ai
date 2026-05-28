import { create } from "zustand";

export const useChatStore = create((set,get)=>({
  chats : [],
  messages : [],
  activeChat : null,

  setActiveChat :(chatId)=>set({activeChat : chatId}),

  recentChats : [
  ],
  createNewChat : ((sessionId,title,messages)=>{
    const newChat = {
      id :sessionId,
      title:title,
    }
    set((state) => ({
    recentChats: [newChat, ...state.recentChats],
    messages :[...messages],
    activeChat: newChat.id
}))
  }),

   addMessage: (role, content) => {
    
    set((state) => ({
      messages: [
        ...state.messages,
        { role: role, content: content }
      ]
    }))
  },

  clearMessage: () => {
    set({
      messages: []
    })
  }

}))