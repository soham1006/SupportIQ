import { prisma } from '../../database/prisma';
import { TicketStatus, UserRole } from '@prisma/client';

export class DashboardRepository {
  async getStats(organizationId: string) {
    const [
  totalTickets,
  openTickets,
  inProgressTickets,
  resolvedTickets,
  closedTickets,
  totalAgents,
  totalDocuments,
  indexedDocuments,
  processingDocuments,
] = await Promise.all([
      prisma.ticket.count({
        where: {
          organizationId,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          status: TicketStatus.OPEN,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          status: TicketStatus.IN_PROGRESS,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          status: TicketStatus.RESOLVED,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          status: TicketStatus.CLOSED,
        },
      }),

      prisma.user.count({
        where: {
          organizationId,
          role: UserRole.AGENT,
          isActive: true,
        },
      }),

      prisma.document.count({
  where: {
    organizationId,
  },
}),

prisma.document.count({
  where: {
    organizationId,
    status: 'READY',
  },
}),

prisma.document.count({
  where: {
    organizationId,
    status: 'PROCESSING',
  },
}),

    ]);

   return {
  totalTickets,
  openTickets,
  inProgressTickets,
  resolvedTickets,
  closedTickets,

  totalAgents,

  totalDocuments,
  indexedDocuments,
  processingDocuments,
};
  }
  async getAgentWorkload(
  organizationId: string,
) {
  const agents = await prisma.user.findMany({
    where: {
      organizationId,
      role: UserRole.AGENT,
      isActive: true,
    },

     orderBy: {
    assignedTickets: {
      _count: 'desc',
    },
  },

  take: 3,

    select: {
      id: true,
      name: true,
      email: true,

      assignedTickets: {
        select: {
          status: true,
        },
      },
    },
  });

  return agents.map(agent => {
    const open =
      agent.assignedTickets.filter(
        t => t.status === TicketStatus.OPEN,
      ).length;

    const inProgress =
      agent.assignedTickets.filter(
        t =>
          t.status ===
          TicketStatus.IN_PROGRESS,
      ).length;

    const resolved =
      agent.assignedTickets.filter(
        t =>
          t.status ===
          TicketStatus.RESOLVED,
      ).length;

    return {
      id: agent.id,
      name: agent.name,
      email: agent.email,

      totalTickets:
        agent.assignedTickets.length,

      open,

      inProgress,

      resolved,
    };
  });
}
async getRecentTickets(
  organizationId: string,
) {
  return prisma.ticket.findMany({
    where: {
      organizationId,
    },

    include: {
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: 'desc',
    },

    take: 5,
  });
}
}

export const dashboardRepository =
  new DashboardRepository();