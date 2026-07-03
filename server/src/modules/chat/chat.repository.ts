import { prisma } from '../../database/prisma';

export class ChatRepository {
  async createConversation(
    userId: string,
    organizationId: string,
  ) {
    return prisma.conversation.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },

        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    });
  }

  async createMessage(
    conversationId: string,
    role: 'USER' | 'ASSISTANT',
    content: string,
  ) {
    return prisma.message.create({
      data: {
        conversation: {
          connect: {
            id: conversationId,
          },
        },

        role,

        content,
      },
    });
  }

 async getMessages(conversationId: string) {
  return prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 10,
  });
}

  async findConversationById(id: string) {
  return prisma.conversation.findUnique({
    where: {
      id,
    },
  });
}

async saveUserMessage(
  conversationId: string,
  content: string,
) {
  return this.createMessage(
    conversationId,
    'USER',
    content,
  );
}

async saveAssistantMessage(
  conversationId: string,
  content: string,
) {
  return this.createMessage(
    conversationId,
    'ASSISTANT',
    content,
  );
}
}

export const chatRepository =
  new ChatRepository();