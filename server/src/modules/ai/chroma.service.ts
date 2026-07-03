import { ChromaClient } from "chromadb";

export const chroma = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false,
});

export async function getCollection() {
  return chroma.getOrCreateCollection({
    name: "supportiq-documents",
    embeddingFunction: null as any,
  });
}