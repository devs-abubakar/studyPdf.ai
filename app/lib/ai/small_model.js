
import { createGroq } from "@ai-sdk/groq";


export const smallLLM = createGroq({
    apiKey : process.env.GROQ_API_KEY
})
