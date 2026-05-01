import { create } from "zustand";

const useEmbeddingStore = create((set) => ({
  embeddings_details: [],

  updateEmbeddings_details: (details) =>
    set(() => ({
      embeddings_details: details,
    })),
}));

export default useEmbeddingStore;