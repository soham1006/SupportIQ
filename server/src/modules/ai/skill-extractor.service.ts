import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env';

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export class SkillExtractorService {
  async extract(question: string): Promise<string[]> {
    const prompt = `
Extract the technical or business support skills required to solve the user's issue.

Return ONLY a JSON array.

Examples:

Question:
"My payment failed"

Output:
["Payments","Billing"]

Question:
"Docker container won't start"

Output:
["Docker","DevOps"]

Question:
"${question}"
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text ?? '[]';

    try {
      return JSON.parse(text);
    } catch {
      return [];
    }
  }
}

export const skillExtractorService =
  new SkillExtractorService();