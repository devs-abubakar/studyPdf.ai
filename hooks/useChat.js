"use client"

import { useState } from "react"

export function useChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return

    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message
        })
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: message
        },
        {
          role: "assistant",
          content: data.response
        }
      ])

      setMessage("")
    } finally {
      setLoading(false)
    }
  }

  return {
    message,
    setMessage,
    messages,
    sendMessage,
    loading
  }
}