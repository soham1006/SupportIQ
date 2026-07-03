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
    ]);

    return {
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
      totalAgents,
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
}

export const dashboardRepository =
  new DashboardRepository();