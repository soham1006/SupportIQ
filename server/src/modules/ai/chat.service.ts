import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env';
import { retrievalService } from './retrieval.service';
import { promptService } from './prompt.service';
import { chatRepository } from '../chat/chat.repository';
import { confidenceService } from './confidence.service';
import { ticketRepository } from '../ticket/ticket.repository';
import { assignmentService } from '../agent/assignment.service';
import { skillExtractorService } from './skill-extractor.service';

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export class ChatService {
 async ask(
  question: string,
  userId: string,
  organizationId: string,
  conversationId?: string,
) {
  let conversation;

  if (conversationId) {
    conversation =
      await chatRepository.findConversationById(
        conversationId,
      );
  }

  if (!conversation) {
    conversation =
      await chatRepository.createConversation(
        userId,
        organizationId,
      );
  }

  await chatRepository.saveUserMessage(
    conversation.id,
    question,
  );

  const history =
  await chatRepository.getMessages(
    conversation.id,
  );

  const retrieval =
    await retrievalService.search(question);


  const prompt =
  promptService.buildPrompt(
    question,
    retrieval.documents,
    history,
  );

  const response =
    await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

  const answer = response.text ?? '';

const confidence =
  confidenceService.calculate(
    retrieval.distances,
  );


const shouldEscalate =
  confidenceService.shouldEscalate(
    confidence,
  );

    let ticket = null;

if (shouldEscalate) {
  const requiredSkills =
  await skillExtractorService.extract(
    question,
  );
  console.log(requiredSkills);

  const bestAgent =
    await assignmentService.findBestAgent(
      organizationId,
      requiredSkills,
    );

  ticket =
    await ticketRepository.create({
      organizationId,
      customerId: userId,
      subject: question,
      description: `
Question:

${question}

AI Answer:

${answer}
`,
      aiConfidence: confidence,
    });

  if (bestAgent) {
    ticket =
      await ticketRepository.assignAgent(
        ticket.id,
        bestAgent.id,
      );
  }
}



  await chatRepository.saveAssistantMessage(
    conversation.id,
    answer,
  );

 return {
  conversationId: conversation.id,

  answer,

  confidence,

  shouldEscalate,

  ticket,

  sources: retrieval.documents,
};
}
}

export const chatService =
  new ChatService();