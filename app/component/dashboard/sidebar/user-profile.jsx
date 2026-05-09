import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserProfile() {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-3">
      <Avatar>
        <AvatarFallback>
          AB
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="text-sm font-medium">
          Abubakar
        </span>

        <span className="text-xs text-muted-foreground">
          Free Plan
        </span>
      </div>
    </div>
  )
}