import { prisma } from '../../database/prisma';
import { TicketStatus, UserRole } from '@prisma/client';

export class AnalyticsRepository {
  async getOverview(
    organizationId: string,
  ) {
    const [
      totalTickets,
      openTickets,
      resolvedTickets,
      totalAgents,
      totalDocuments,
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
          status: TicketStatus.RESOLVED,
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
    ]);

    const resolutionRate =
      totalTickets === 0
        ? 0
        : Number(
            (
              (resolvedTickets /
                totalTickets) *
              100
            ).toFixed(1),
          );

    const inProgressTickets =
  await prisma.ticket.count({
    where: {
      organizationId,
      status: TicketStatus.IN_PROGRESS,
    },
  });

const closedTickets =
  await prisma.ticket.count({
    where: {
      organizationId,
      status: TicketStatus.CLOSED,
    },
  });

const averageAIConfidence =
  await prisma.ticket.aggregate({
    where: {
      organizationId,
    },

    _avg: {
      aiConfidence: true,
    },
  });

    return {
  totalTickets,
  openTickets,
  inProgressTickets,
  resolvedTickets,
  closedTickets,
  totalAgents,
  totalDocuments,

  resolutionRate,

  averageAIConfidence:
    Number(
      averageAIConfidence._avg
        .aiConfidence ?? 0,
    ).toFixed(1),
};
  }

  async getTicketStatus(
  organizationId: string,
) {
  const statuses = [
    TicketStatus.OPEN,
    TicketStatus.IN_PROGRESS,
    TicketStatus.RESOLVED,
    TicketStatus.CLOSED,
  ];

  const data = await Promise.all(
    statuses.map(async status => ({
      status,
      count: await prisma.ticket.count({
        where: {
          organizationId,
          status,
        },
      }),
    })),
  );

  return data;
}
async getTicketTrend(
  organizationId: string,
) {
  const tickets =
    await prisma.ticket.findMany({
      where: {
        organizationId,
      },

      select: {
        createdAt: true,
      },
    });

  const map = new Map<
    string,
    number
  >();

  for (const ticket of tickets) {
    const date =
      ticket.createdAt
        .toISOString()
        .split('T')[0];

    map.set(
      date,
      (map.get(date) ?? 0) + 1,
    );
  }

  return Array.from(
    map.entries(),
  )
    .sort(([a], [b]) =>
      a.localeCompare(b),
    )
    .map(([date, count]) => ({
      date,
      count,
    }));
}

async getTopAgents(
  organizationId: string,
) {
  const agents =
    await prisma.user.findMany({
      where: {
        organizationId,
        role: UserRole.AGENT,
      },

      select: {
        id: true,
        name: true,
        email: true,

        assignedTickets: {
          where: {
            status:
              TicketStatus.RESOLVED,
          },

          select: {
            id: true,
          },
        },
      },
    });

  return agents
    .map(agent => ({
      id: agent.id,
      name: agent.name,
      email: agent.email,

      resolved:
        agent.assignedTickets.length,
    }))
    .sort(
      (a, b) =>
        b.resolved - a.resolved,
    )
    .slice(0, 5);
}

}

export const analyticsRepository =
  new AnalyticsRepository();