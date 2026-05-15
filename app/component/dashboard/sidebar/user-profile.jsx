import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserProfile({ collapsed }) {
  const avatar = (
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
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
          <span className="text-sm font-medium truncate">Abubakar</span>
          <span className="text-xs text-muted-foreground">Free Plan</span>
        </div>
      )}
    </div>
  )
}
