import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { useChatStore } from "@/store/chat-store"
import { useEffect } from "react"

function getInitials(name, email) {
  if (name) {
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  // fallback to email first two chars
  if (email) return email.slice(0, 2).toUpperCase()
  return "?"
}

export function UserProfile({ collapsed }) {
  const { user, loading } = useAuth()
  const setUser = useChatStore((state) => state.setUsername)

  const name = user?.user_metadata?.name
  const email = user?.email
  const avatarUrl = user?.user_metadata?.avatar_url // populated by Google OAuth automatically

  useEffect(() => {
    if (name) setUser(name)
  }, [setUser, name])

  const avatar = (
    <Avatar>
      <AvatarImage src={avatarUrl} alt={name ?? email} />
      <AvatarFallback className="bg-gradient-to-br from-[#FF70BF] to-[#831C91] text-white text-xs font-bold">
        {loading ? "..." : getInitials(name, email)}
      </AvatarFallback>
    </Avatar>
  )

  return (
    <div
      className={`
        flex items-center rounded-xl border
        ${collapsed
          ? "justify-center p-2"
          : "w-auto gap-3 p-3"
        }
      `}
    >
      {avatar}
      {!collapsed && (
        <div className="flex flex-col min-w-0">
          {name && (
            <span className="text-sm font-semibold truncate">{name}</span>
          )}
          <span className="text-xs text-muted-foreground truncate">{email}</span>
          <span className="text-xs text-muted-foreground">Free Plan</span>
        </div>
      )}
    </div>
  )
}