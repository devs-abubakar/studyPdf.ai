import { MessageSquare, FileText, Sparkles } from "lucide-react"

const suggestions = [
  { icon: MessageSquare, text: "Summarize my PDF document" },
  { icon: FileText, text: "Explain key concepts from my notes" },
  { icon: Sparkles, text: "Generate practice questions" },
]

export default function WelcomeScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-36">
      {/* Logo / Brand mark */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/10">
        <Sparkles className="h-8 w-8 text-brand-purple" />
      </div>

      {/* Greeting */}
      <h1 className="font-display text-3xl font-semibold text-foreground">
        Hello, Abubakar
      </h1>
      <p className="mt-2 text-muted-foreground">
        How can I help you today?
      </p>

      {/* Suggestion chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {suggestions.map(({ icon: Icon, text }) => (
          <button
            key={text}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-brand-pink/40 hover:text-brand-purple hover:bg-brand-pink/5"
          >
            <Icon className="h-4 w-4" />
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}
