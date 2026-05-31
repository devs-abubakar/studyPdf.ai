import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai'; // Removed the hallucinated import

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

  // ✅ Use the method that matches your specific installed SDK version
  return result.toTextStreamResponse(); 
}