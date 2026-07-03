import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env';

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export class ChatStreamService {
  async stream(
    prompt: string,
    onChunk: (text: string) => void,
  ) {
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let finalText = '';

    for await (const chunk of stream) {
      const text = chunk.text ?? '';

      finalText += text;

      onChunk(text);
    }

    return finalText;
  }
}

export const chatStreamService =
  new ChatStreamService();