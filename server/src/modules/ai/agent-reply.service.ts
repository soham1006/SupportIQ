import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env';
import { retrievalService } from './retrieval.service';

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export class AgentReplyService {
  async generate(
    question: string,
    history: string[],
  ) {
    const retrieval =
      await retrievalService.search(question);

    const prompt = `
You are an expert customer support agent.

Use:

1. Ticket
2. Previous replies
3. Retrieved documentation

Write a professional reply.

--------------------------------

Ticket

${question}

--------------------------------

Conversation

${history.join('\n')}

--------------------------------

Knowledge

${retrieval.documents.join('\n\n')}

--------------------------------

Reply
`;

    const response =
      await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

    return response.text ?? '';
  }
}

export const agentReplyService =
  new AgentReplyService();