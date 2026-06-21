import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
export function UserProfile({ collapsed }) {
  const avatar = (
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
  const {user, loading} = useAuth()

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
          <span className="text-sm font-medium truncate">{user?.email}</span>
          <span className="text-xs text-muted-foreground">Free Plan</span>
        </div>
      )}
    </div>
  )
}
