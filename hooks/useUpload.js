"use client"

import { useState } from "react"

export function useUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleChangeFile = (e) => {
    const file = e.target.files[0]

    if (!file) return

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const uploadFile = async () => {
    if (!selectedFile) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const res = await fetch("/api/files", {
        method: "POST",
        body: formData
      })

      return await res.json()
    } finally {
      setUploading(false)
    }
  }

  return {
    selectedFile,
    previewUrl,
    uploading,
    handleChangeFile,
    uploadFile
  }
}