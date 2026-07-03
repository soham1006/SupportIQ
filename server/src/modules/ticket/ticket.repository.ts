import { prisma } from '../../database/prisma';
import { TicketStatus } from '@prisma/client';

export class TicketRepository {
 async create(data: {
  organizationId: string;
  customerId: string;
  subject: string;
  description: string;
  aiConfidence: number;
}){
   return prisma.ticket.create({
  data: {
    organization: {
      connect: {
        id: data.organizationId,
      },
    },

    customer: {
      connect: {
        id: data.customerId,
      },
    },

    subject: data.subject,

    description: data.description,

    aiConfidence: data.aiConfidence,

    status: TicketStatus.OPEN,
  },
});
  }

  async assignAgent(
  ticketId: string,
  agentId: string,
) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },

    data: {
      assignedAgent: {
        connect: {
          id: agentId,
        },
      },
    },
  });
}

async findAll(
  organizationId: string,
) {
  return prisma.ticket.findMany({
    where: {
      organizationId,
    },

    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      assignedAgent: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: 'desc',
    },
  });
}

async findById(
  ticketId: string,
  organizationId: string,
) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
      organizationId,
    },

    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      assignedAgent: {
        select: {
          id: true,
          name: true,
          email: true,
          skills: true,
        },
      },

      replies: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },

        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
}
async createReply(data: {
  ticketId: string;
  userId: string;
  message: string;
}) {
  return prisma.ticketReply.create({
    data: {
      ticket: {
        connect: {
          id: data.ticketId,
        },
      },

      user: {
        connect: {
          id: data.userId,
        },
      },

      message: data.message,
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
}

async getTicketForAI(
  ticketId: string,
  organizationId: string,
) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
      organizationId,
    },

    include: {
      customer: true,

      replies: {
        include: {
          user: true,
        },

        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
}

async updateStatus(
  ticketId: string,
  organizationId: string,
  status: TicketStatus,
) {
  return prisma.ticket.updateMany({
    where: {
      id: ticketId,
      organizationId,
    },

    data: {
      status,
    },
  });
}
async findMyTickets(
  customerId: string,
  organizationId: string,
) {
  return prisma.ticket.findMany({
    where: {
      customerId,
      organizationId,
    },

    include: {
      assignedAgent: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: 'desc',
    },
  });
}

async assignTicket(
  ticketId: string,
  organizationId: string,
  agentId: string,
) {
  return prisma.ticket.updateMany({
    where: {
      id: ticketId,
      organizationId,
    },

    data: {
      assignedAgentId: agentId,
    },
  });
}
}

export const ticketRepository =
  new TicketRepository();