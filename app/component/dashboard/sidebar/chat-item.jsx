"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { useChatStore } from "@/store/chat-store"

const MIN_TITLE_LENGTH = 3

export function ChatItem({
  title,
  onClick,
  active,
  sessionId,
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)

  const [newTitle, setNewTitle] = useState(title)
  const [renameError, setRenameError] = useState("")

  const setActiveChat = useChatStore((state) => state.setActiveChat)
  const removeChat = useChatStore((state) => state.removeChat)
  const updateChatTitle = useChatStore((state) => state.updateChatTitle)

  function openRenameDialog() {
    setNewTitle(title)
    setRenameError("")
    setRenameDialogOpen(true)
  }

  async function onDelete() {
    if (deleteLoading) return

    setDeleteLoading(true)

    try {
      const res = await fetch(`/api/chat/${sessionId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to delete chat")
      }

      if (active) {
        setActiveChat(null)
      }

      removeChat(sessionId)
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error("Failed to delete chat:", error)
    } finally {
      setDeleteLoading(false)
    }
  }

  async function onRename() {
    if (renameLoading) return

    const trimmedTitle = newTitle.trim()

    if (trimmedTitle.length < MIN_TITLE_LENGTH) {
      setRenameError(
        `Title must be at least ${MIN_TITLE_LENGTH} characters long.`
      )
      return
    }

    if (trimmedTitle === title.trim()) {
      setRenameDialogOpen(false)
      return
    }

    setRenameLoading(true)
    setRenameError("")

    try {
      const res = await fetch(`/api/chat/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to rename chat")
      }

      updateChatTitle(sessionId, trimmedTitle)
      setRenameDialogOpen(false)
    } catch (error) {
      console.error("Failed to rename chat:", error)
      setRenameError("Failed to rename chat. Please try again.")
    } finally {
      setRenameLoading(false)
    }
  }

  return (
    <>
      {/* Chat item */}
      <div
        className={`group flex w-full min-w-0 items-center gap-1 rounded-md ${
          active ? "bg-accent" : "hover:bg-accent"
        }`}
      >
        {/* Chat title */}
        <Button
          variant="ghost"
          className="min-w-0 flex-1 justify-start overflow-hidden bg-transparent px-3 hover:bg-transparent"
          onClick={onClick}
          disabled={deleteLoading || renameLoading}
        >
          <span className="block min-w-0 truncate text-left">
            {title}
          </span>
        </Button>

        {/* Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={deleteLoading || renameLoading}
              className="
                mr-1
                h-9
                w-9
                shrink-0
                bg-transparent
                opacity-100
                hover:bg-muted
                focus-visible:bg-muted

                sm:opacity-0
                sm:group-hover:opacity-100
                sm:focus-visible:opacity-100
              "
            >
              <MoreHorizontal className="h-4 w-4" />

              <span className="sr-only">
                Chat options
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="w-44"
          >
            <DropdownMenuItem
              onClick={openRenameDialog}
              disabled={renameLoading}
              className="min-h-10"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>

            <DropdownMenuItem
              className="min-h-10 text-destructive focus:text-destructive"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={deleteLoading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Rename Dialog */}
      <Dialog
        open={renameDialogOpen}
        onOpenChange={(open) => {
          if (!renameLoading) {
            setRenameDialogOpen(open)

            if (!open) {
              setRenameError("")
            }
          }
        }}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Rename chat</DialogTitle>

            <DialogDescription>
              Enter a new name for this chat.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value)
                setRenameError("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRename()
                }
              }}
              autoFocus
              maxLength={100}
              disabled={renameLoading}
              className="
                w-full
                min-h-10
                rounded-md
                border
                bg-background
                px-3
                py-2
                text-base
                outline-none
                focus:ring-2
                focus:ring-ring
              "
              placeholder="Chat title"
            />

            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                Minimum {MIN_TITLE_LENGTH} characters
              </span>

              <span className="shrink-0">
                {newTitle.trim().length}/100
              </span>
            </div>

            {renameError && (
              <p className="text-sm text-destructive">
                {renameError}
              </p>
            )}
          </div>

          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:gap-0">
            <Button
              variant="outline"
              disabled={renameLoading}
              onClick={() => setRenameDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              disabled={
                renameLoading ||
                newTitle.trim().length < MIN_TITLE_LENGTH
              }
              onClick={onRename}
              className="w-full sm:w-auto"
            >
              {renameLoading ? "Renaming..." : "Rename"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!deleteLoading) {
            setDeleteDialogOpen(open)
          }
        }}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>
              Delete this chat?
            </DialogTitle>

            <DialogDescription>
              This will permanently delete{" "}
              <span className="font-medium text-foreground break-words">
                "{title}"
              </span>{" "}
              and all of its messages. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:gap-0">
            <Button
              variant="outline"
              disabled={deleteLoading}
              onClick={() => setDeleteDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={deleteLoading}
              onClick={onDelete}
              className="w-full sm:w-auto"
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
