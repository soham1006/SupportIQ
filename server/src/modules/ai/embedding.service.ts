import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env';

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export class EmbeddingService {
  async embed(text: string): Promise<number[]> {
    const response = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: text,
    });

    return response.embeddings?.[0]?.values ?? [];
  }

  async embedMany(chunks: string[]): Promise<number[][]> {
    const vectors: number[][] = [];

    for (const chunk of chunks) {
      const embedding = await this.embed(chunk);
      vectors.push(embedding);
    }

    return vectors;
  }
}

export const embeddingService = new EmbeddingService();