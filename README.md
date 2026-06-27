📄 StudyPDF.ai

AI-powered study assistant that lets you upload PDFs and ask questions with accurate, context-aware answers.

## 🚀 Demo

![StudyPDF.ai Demo](https://raw.githubusercontent.com/devs-abubakar/studyPdf.ai/main/public/assets/demo.gif)

🚀 Live Demo
https://study-pdf-ai.vercel.app/

✨ What it does

StudyPDF.ai helps you:

Upload any PDF
Ask questions in natural language
Get answers grounded in your document
View relevant source chunks
Understand concepts faster without reading everything manually
🧠 Why this project is different

Most AI PDF tools:

Repeat irrelevant chunks
Lose context in long documents
Don’t explain reasoning clearly

This project improves that by using:

Vector similarity search for retrieval
MMR (Max Marginal Relevance) to reduce repetition
Context-aware chunking strategy
Streaming responses for better UX
⚙️ Tech Stack
Next.js
Tailwind CSS
GoogleEmbeddings API
Vector database (Supabase)
RAG architecture
🏗️ Architecture

User PDF → Text Extraction → Chunking → Embeddings → Vector DB
→ Query Embedding → Similarity Search / MMR → Context → LLM → Answer


📸 Features
📄 PDF Upload

Upload and process documents instantly.

🔍 Smart Retrieval

Finds the most relevant sections using vector search.

🧠 AI Answers

Answers are strictly based on document context.

⚡ Streaming UI

Real-time response generation like ChatGPT.

🧪 Challenges I faced
Chunking large PDFs without losing context
Improving retrieval quality (solved using MMR)
Reducing hallucinations in answers
Handling long context efficiently
📌 Future improvements
Multi-document chat
Highlight answers inside PDF
Better ranking system for retrieval
Save chat history per document
Faster embedding pipeline
🧑‍💻 Author

Built by Abubakar
Passionate about AI, systems, and full stack engineering.
