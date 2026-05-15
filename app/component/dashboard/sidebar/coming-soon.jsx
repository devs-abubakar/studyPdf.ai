import { SparkleIcon } from "lucide-react"
import { Sparkles } from "lucide-react"

export function ComingSoon({collapsed}) {
  if (!collapsed){return (
    <div className="rounded-xl border p-3">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4" />

        <h4 className="text-sm font-medium">
          Coming Soon
        </h4>
      </div>

      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>AI Voice Chat</li>
        <li>PDF Upload</li>
        <li>AI Memory</li>
        <li>Code Interpreter</li>
      </ul>
    </div>
  )
}
return(
 <div className="flex justify-center items-center">
    <SparkleIcon />
  </div>
)
}