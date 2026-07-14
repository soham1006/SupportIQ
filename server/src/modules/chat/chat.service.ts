import {
  NotificationType,
  TicketPriority,
} from '@prisma/client';
import { geminiService } from '../ai/gemini.service';

import { retrievalService } from '../ai/retrieval.service';
import { promptService } from '../ai/prompt.service';
import { confidenceService } from '../ai/confidence.service';
import { skillExtractorService } from '../ai/skill-extractor.service';

import { chatRepository } from './chat.repository';
import { ticketRepository } from '../ticket/ticket.repository';
import { assignmentService } from '../agent/assignment.service';
import { notificationService } from '../notification/notification.service';

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
  await retrievalService.search(
    question,
    organizationId,
  );

    const prompt =
      promptService.buildPrompt(
        question,
        retrieval.documents,
        history,
      );

    let answer = '';

    try {
      answer =
  await geminiService.generate(
    prompt,
  );
    } catch (error: any) {
      console.error(
        'Gemini Error:',
        error,
      );

      if (error?.status === 429) {
        answer =
          'The AI service is temporarily unavailable because the Gemini API quota has been exceeded. Please try again later.';
      } else {
        answer =
          'Sorry, an unexpected AI error occurred. Please try again later.';
      }

      await chatRepository.saveAssistantMessage(
        conversation.id,
        answer,
      );

      return {
        conversationId:
          conversation.id,

        answer,

        confidence: 0,

        shouldEscalate: false,

        ticket: null,

        sources: [],
      };
    }

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
          description: `Question:

${question}

AI Answer:

${answer}`,
          priority:
            TicketPriority.MEDIUM,
          aiConfidence:
            confidence,
        });

      if (bestAgent) {
        ticket =
          await ticketRepository.assignAgent(
            ticket.id,
            bestAgent.id,
          );

        await notificationService.create({
          userId:
            bestAgent.id,

          title:
            'New AI Escalation',

          message: `Ticket "${ticket.subject}" has been assigned to you.`,

          type:
            NotificationType.TICKET_ASSIGNED,
        });
      }
    }

    await chatRepository.saveAssistantMessage(
      conversation.id,
      answer,
    );

    return {
      conversationId:
        conversation.id,

      answer,

      confidence,

      shouldEscalate,

      ticket,

      sources:
        retrieval.documents.map(
          (
            document,
            index,
          ) => ({
            document,

            metadata:
              retrieval.metadatas?.[
                index
              ] ?? null,
          }),
        ),
    };
  }

  async getConversations(
    userId: string,
  ) {
    return chatRepository.getConversations(
      userId,
    );
  }

  async getMessages(
    conversationId: string,
  ) {
    return chatRepository.getConversationMessages(
      conversationId,
    );
  }
}

export const chatService =
  new ChatService();