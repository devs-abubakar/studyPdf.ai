import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai'; // Removed the hallucinated import
import {createDeepSeek} from "@ai-sdk/deepseek"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

export const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function chatGroq(messages,onFinishCallback) {
  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages: messages,
    temperature: 0,
    maxRetries: 2,
    onFinish:onFinishCallback
  });

  return result.toTextStreamResponse(); 
}

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
})