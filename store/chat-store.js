import { create } from "zustand";

export const useChatStore = create((set,get)=>({
  chats : [],
  activeChat : null,

  setActiveChat :(chatId)=>set({activeChat : chatId}),
  createNewChat : ((sessionId,title)=>{
    const newChat = {
      sessionId,
      title,
      messages: []
    }
    set((state) => ({
    chats: [newChat, ...state.chats],
    messages :[],
    activeChat: newChat.sessionId
}))
  }),

addMessage: (role, content) => {
    const { activeChat } = get()

    if (!activeChat) return

    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.sessionId === activeChat
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { role, content: String(content ?? "") }
              ]
            }
          : chat
      )
    }))
  },
}))