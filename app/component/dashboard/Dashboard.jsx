"use client"

import { useAuth } from "@/hooks/useAuth"
import { useUpload } from "@/hooks/useUpload"
import { useChat } from "@/hooks/useChat"

export default function Dashboard() {
  const { user } = useAuth()

  const {
    selectedFile,
    previewUrl,
    handleChangeFile,
    uploadFile
  } = useUpload()

  const {
    message,
    setMessage,
    sendMessage,
    messages
  } = useChat()

  return (
    <div className="p-10 space-y-6">
      <h1>{user?.email}</h1>

      <input type="file" onChange={handleChangeFile} />

      <button onClick={uploadFile}>
        Upload
      </button>

      {selectedFile && (
        <div>
          <p>{selectedFile.name}</p>

          <img
            src={previewUrl}
            alt="preview"
            className="w-48"
          />
        </div>
      )}

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.role}</strong>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}