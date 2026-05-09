import { embeddings } from "../geminiEmbedding";
import { createClient } from '@/app/lib/supabase/server'

export async function embedChunk(chunks, fileId, userId) {
    const supabase = await createClient()
  const texts = chunks.map(c => c.pageContent);
  const vectors = await embeddings.embedDocuments(texts);

  const rows = chunks.map((chunk, i) => ({
    content: chunk.pageContent,
    metadata: {
      fileId,
      chunkId: i,
    },
    embedding: vectors[i],
    user_id: userId,
  }));

  await supabase.from("documents").insert(rows);

  return { fileId, totalChunks: rows.length };
}