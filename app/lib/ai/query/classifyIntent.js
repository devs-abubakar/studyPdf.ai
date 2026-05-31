import { generateText } from "ai";
import { smallLLM } from "../small_model";


export async function classifyIntent(userPrompt){
    

    const SYSTEM_PROMPT = `You are a strict intent classification system. Your task is to analyze the user input and determine if they want to find information within files/documents they have uploaded, or if they are asking a standard informational question.

Classify the input into exactly one of these two options:
- "Search" (The user explicitly or implicitly references documents, files, PDFs, notes, or uploaded data they want to search through).
- "General" (The user is asking a standard question, seeking an explanation, writing code, or making a request that relies on general knowledge).

Rules:
1. Respond ONLY with the single word "Search" or "General".
2. Do not include punctuation, reasoning, or wrapper marks.
3. If unsure, default to "General".

`

    try{
        const response =await generateText({
            model:smallLLM("llama-3.3-70b-versatile"),
            system:SYSTEM_PROMPT,
            prompt:userPrompt,
            temperature:0,
        })
        const intent = response.text.trim()
        return intent
    }catch(err){
        console.error(err)
        return "General"
    }
}