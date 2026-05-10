import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserProfile({collapsed}) {
  const avatar =( 
  <Avatar>
        <AvatarFallback>
          AB
        </AvatarFallback>
  </Avatar>
  )

    return (
    <div className="flex items-center w-auto gap-3 rounded-xl border p-3">

      {avatar}
      {!collapsed && <div className="flex flex-col">
        <span className="text-sm font-medium">
          Abubakar
        </span>

        <span className="text-xs text-muted-foreground">
          Free Plan
        </span>
      </div>}
    </div>
  )
}
