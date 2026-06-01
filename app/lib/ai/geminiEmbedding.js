import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_API_KEY in environment variables");
}

export const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "gemini-embedding-001",
      apiKey : apiKey
    });
