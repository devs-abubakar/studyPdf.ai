import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  chats: [],
  activeChat: null,
  
  // Agent BTS
  agentAction: null,
  setAgentAction:(action)=>set({agentAction:action}),

  actionProgress: null,
  setActionProgress: (progress)=>set({actionProgress:progress}),



  updateLastMessagePayload: (payload) => set((state) => {
  const chats = [...state.chats];
  const chatIndex = chats.findIndex(c => c.sessionId === state.activeChat);
  if (chatIndex === -1) return {};

  const messages = [...chats[chatIndex].messages];
  if (messages.length === 0) return {};

  // Merge tool data values into the active assistant message bubble
  messages[messages.length - 1] = {
    ...messages[messages.length - 1],
    ...payload
  };

  chats[chatIndex].messages = messages;
  return { chats };
}),



  setChats: (chats) => set({ chats }),
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  
  // 1. Hydrate historical messages into a specific chat
  setHistoricalMessages: (sessionId, messages) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.sessionId === sessionId
        ? { ...chat, messages: messages }
        : chat
    )
  })),

  // 2. Initialize a clean new chat session
  createNewChat: (sessionId, title) => {
    const newChat = {
      sessionId,
      title,
      messages: [],
      persisted:false 
    };
    
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChat: newChat.sessionId
    }));
  },

  updateChatTitle: (sessionId, title) => set((state) => ({
  chats: state.chats.map((chat) =>
    chat.sessionId === sessionId
      ? { ...chat, title }
      : chat
  )
})),  updateChatPersisted: (sessionId, persisted) => set((state) => ({
  chats: state.chats.map((chat) =>
    chat.sessionId === sessionId
      ? { ...chat, persisted }
      : chat
  )
})),
  // 3. Add an entirely new complete message block (User prompts, or empty Assistant boxes)
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
  }, // <--- This cleanly closes addMessage

  // 4. Precision stream appender that modifies the final message in real-time
  appendToLastMessage: (chunk) => {
    set((state) => {
      const activeChatId = state.activeChat;
      if (!activeChatId) return state;

      return {
        chats: state.chats.map((chat) => {
          if (chat.sessionId !== activeChatId) return chat;

          const updatedMessages = [...chat.messages];
          if (updatedMessages.length === 0) return chat;

          const lastIndex = updatedMessages.length - 1;
          const lastMessage = updatedMessages[lastIndex];

          updatedMessages[lastIndex] = {
            ...lastMessage,
            content: (lastMessage.content || "") + chunk,
          };

          return { ...chat, messages: updatedMessages };
        }),
      };
    });
  }
}));