import { prisma } from '../../database/prisma';
import { UserRole } from '@prisma/client';

export class AgentRepository {
  async getOrganizationAgents(
    organizationId: string,
  ) {
    return prisma.user.findMany({
      where: {
        organizationId,
        role: UserRole.AGENT,
        isActive: true,
      },

      select: {
        id: true,
        name: true,
        email: true,
        skills: true,
      },
    });
  }
  async getOpenTicketCount(agentId: string) {
  return prisma.ticket.count({
    where: {
      assignedAgentId: agentId,
      status: {
        in: ['OPEN', 'IN_PROGRESS'],
      },
    },
  });
}
}

export const agentRepository =
  new AgentRepository();