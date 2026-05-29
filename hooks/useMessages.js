import { supabase } from "@/app/lib/supabase/client";
import { useState, useEffect } from "react";
import { useChatStore } from "@/store/chat-store"; // Adjust path as needed

export function useMessages(activeChatId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const setHistoricalMessages = useChatStore((s) => s.setHistoricalMessages);
  const currentChat = useChatStore((s) => 
    s.chats.find((c) => c.sessionId === activeChatId)
  );

  useEffect(() => {
    if (!activeChatId) return;

    // PERFORMANCE WIN: If we already have messages in memory, don't re-fetch from Supabase
    if (currentChat && currentChat.messages && currentChat.messages.length > 0) {
      return; 
    }

    async function loadMessages() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("chat_messages")
        .select("id, role, content, created_at")
        .eq("session_id", activeChatId)
        .order("created_at", { ascending: true })
        .range(0, 29); // Consider dynamic pagination later

      if (error) {
        setError(error);
      } else if (data) {
        // Push the historical data into our Single Source of Truth
        setHistoricalMessages(activeChatId, data);
      }
      
      setLoading(false);
    }

    loadMessages();
  }, [activeChatId, setHistoricalMessages, currentChat]);

  return { loading, error };
}