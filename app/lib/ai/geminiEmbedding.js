import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const apiKey = process.env.GOOGLE_API_KEY;

console.log(apiKey)
export const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-001",
      apiKey : process.env.GOOGLE_API_KEY
    });
