import { smallLLM } from "./small_model";
import { generateText } from "ai";


export async function TitleGenerator(userPrompt,onFinish){
    
const FALLBACK_TITLES = [
  "New Session", "Untitled Chat", "Fresh Start", 
  "Chat Session", "Quick Query", "Data Stream", 
  "Logic Thread", "Memory Node"
];
    
    const SYSTEM_PROMPT=`You are a title generation engine. Your ONLY task is to summarize the user's prompt into a concise title of exactly 2 to 3 words for the chat title.

Rules:
Title should be MEANINGFUL.

Use ONLY the user's message as context.

Output MUST be 4 words max.

Do not include quotes, periods, or formatting.

Do not include conversational filler like "Here is the title" or "Title:".

Return the title text only.`
    try{
        const title =await generateText({
            model:smallLLM("llama-3.3-70b-versatile"),
            prompt:userPrompt,
            system:SYSTEM_PROMPT,
            maxRetries:3,
            onFinish:onFinish
        })
        console.log("New generated title is ===>", title.text)
        return title.text
    }catch(err){
        console.error(err)
        return FALLBACK_TITLES[Math.floor(Math.random() * FALLBACK_TITLES.length)]
    }
}