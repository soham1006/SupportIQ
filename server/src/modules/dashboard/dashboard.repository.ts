import {
  TicketStatus,
  UserRole,
} from '@prisma/client';

import { prisma } from '../../database/prisma';

export class DashboardRepository {
  /* ---------------- Admin Stats ---------------- */

  async getStats(
    organizationId: string,
  ) {
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
          status:
            TicketStatus.OPEN,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          status:
            TicketStatus.IN_PROGRESS,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          status:
            TicketStatus.RESOLVED,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          status:
            TicketStatus.CLOSED,
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

  /* ---------------- Agent Dashboard ---------------- */

  async getAgentStats(
    agentId: string,
    organizationId: string,
  ) {
    const [
      assigned,
      open,
      inProgress,
      resolved,
    ] = await Promise.all([
      prisma.ticket.count({
        where: {
          organizationId,
          assignedAgentId:
            agentId,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          assignedAgentId:
            agentId,
          status:
            TicketStatus.OPEN,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          assignedAgentId:
            agentId,
          status:
            TicketStatus.IN_PROGRESS,
        },
      }),

      prisma.ticket.count({
        where: {
          organizationId,
          assignedAgentId:
            agentId,
          status:
            TicketStatus.RESOLVED,
        },
      }),
    ]);

    return {
      assigned,
      open,
      inProgress,
      resolved,
    };
  }

  /* ---------------- Agent Workload ---------------- */

  async getAgentWorkload(
    organizationId: string,
  ) {
    const agents =
      await prisma.user.findMany({
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
          ticket =>
            ticket.status ===
            TicketStatus.OPEN,
        ).length;

      const inProgress =
        agent.assignedTickets.filter(
          ticket =>
            ticket.status ===
            TicketStatus.IN_PROGRESS,
        ).length;

      const resolved =
        agent.assignedTickets.filter(
          ticket =>
            ticket.status ===
            TicketStatus.RESOLVED,
        ).length;

      return {
        id: agent.id,
        name: agent.name,
        email: agent.email,

        totalTickets:
          agent.assignedTickets
            .length,

        open,
        inProgress,
        resolved,
      };
    });
  }

  /* ---------------- Recent Tickets ---------------- */

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