import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  chats: [],
  activeChat: null,
  setChats: (chats) => set({ chats }),
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  
  // NEW: Action to hydrate historical messages into a specific chat
  setHistoricalMessages: (sessionId, messages) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.sessionId === sessionId
        ? { ...chat, messages: messages }
        : chat
    )
  })),

  createNewChat: (sessionId, title) => {
    const newChat = {
      sessionId,
      title,
      messages: [] 
    };
    
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChat: newChat.sessionId
      // BUG FIX: Removed the floating 'messages: []' that was overriding root state
    }));
  },

  addMessage: (role, content) => {
    const { activeChat } = get();
    if (!activeChat) return;

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
    }));
  },
}));