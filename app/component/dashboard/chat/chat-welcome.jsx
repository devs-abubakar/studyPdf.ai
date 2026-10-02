import {useChatStore} from "@/store/chat-store"
import {MessageSquare, FileText, Sparkles} from "lucide-react"
import {Button} from "@/components/ui/button";

const suggestions = [
    {icon: MessageSquare, text: "Summarize my PDF document"},
    {icon: FileText, text: "Explain key concepts from my notes"},
    {icon: Sparkles, text: "Generate practice questions"},
]

export default function WelcomeScreen() {

    const username = useChatStore((state) => state.username)

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-36">
            {/* Logo / Brand mark */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <img src={"/icon.svg"} className={"size-36"}/>
            </div>

            {/* Greeting */}
            <h1 className="font-display text-3xl font-semibold text-foreground">
                Hello, {username}
            </h1>
            <p className="mt-2 text-muted-foreground">
                How can I help you today?
            </p>

            {/* Suggestion chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                {suggestions.map(({icon: Icon, text}) => (
                    <Button
                        key={text}
                        variant={"outline"}
                    >
                        <Icon className="h-4 w-4"/>
                        {text}
                    </Button>
                ))}
            </div>
        </div>
    )
}
