"use client"

import {useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import {
    FileText,
    MessageSquare,
    Sparkles,
    Zap,
    Shield,
    Users, Home,
} from "lucide-react"

const features = [
    {
        icon: FileText,
        title: "Upload Any PDF",
        description: "Drag and drop or browse to upload PDFs of any size. Our system handles documents up to 100MB seamlessly.",
    },
    {
        icon: MessageSquare,
        title: "Ask Questions Naturally",
        description: "Chat with your documents using plain language. Get precise answers with citations from the source.",
    },
    {
        icon: Sparkles,
        title: "AI-Powered Summaries",
        description: "Get instant summaries, key points, and action items. Save hours of reading time with smart extraction.",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Built on optimized vector search and streaming responses. Get answers in seconds, not minutes.",
    },
    {
        icon: Shield,
        title: "Private & Secure",
        description: "Your documents are encrypted at rest and in transit. We never train on your data.",
    },
    {
        icon: Users,
        title: "Team Collaboration - Comming Soon",
        description: "Share workspaces, annotate together, and build a knowledge base for your entire organization.",
    },
]

const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({behavior: "smooth"})
    }
}

export default function Page() {
    const [activeTab, setActiveTab] = useState("feat")

    const handleTabChange = (value) => {
        setActiveTab(value)
        scrollToSection(value)
    }

    return (
        <div className="w-full min-h-screen bg-background">
            <nav className="p-2 flex justify-between items-center">
                <Button size="icon-lg" variant="ghost">
                    <Home/>
                </Button>
                <Tabs
                    defaultValue="feat"
                    onValueChange={handleTabChange}
                >
                    <TabsList>
                        <TabsTrigger value="feat">Features</TabsTrigger>
                        <TabsTrigger value="team">Team</TabsTrigger>
                        <TabsTrigger value="pricing">Pricing</TabsTrigger>
                        <TabsTrigger value="join">Join</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Button asChild>
                    <a href="/sign-up">Get Started</a>
                </Button>
            </nav>


        </div>
    )
}