import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env';

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export class GeminiService {
  async generate(
    prompt: string,
  ) {
    const response =
      await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

    return response.text ?? '';
  }

  async stream(
    prompt: string,
    onChunk: (text: string) => void,
  ) {
    const stream =
      await ai.models.generateContentStream({
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

export const geminiService =
  new GeminiService();