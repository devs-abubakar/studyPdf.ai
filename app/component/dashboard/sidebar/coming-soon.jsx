import { SparkleIcon } from "lucide-react"
import { Sparkles } from "lucide-react"

export function ComingSoon({collapsed}) {
  if (!collapsed){return (
    <div className="rounded-lg border p-3 mx-2">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4" />

        <h4 className="text-sm font-medium">
          Coming Soon
        </h4>
      </div>

      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>AI voice chat</li>
        <li>Real time tests by AI</li>
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