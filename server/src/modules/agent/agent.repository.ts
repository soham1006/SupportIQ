import { prisma } from '../../database/prisma';
import { UserRole } from '@prisma/client';

export class AgentRepository {
  /* ---------------- Assignment ---------------- */

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

  async getOpenTicketCount(
    agentId: string,
  ) {
    return prisma.ticket.count({
      where: {
        assignedAgentId: agentId,

        status: {
          in: [
            'OPEN',
            'IN_PROGRESS',
          ],
        },
      },
    });
  }

  /* ---------------- CRUD ---------------- */

  async findAll(
    organizationId: string,
  ) {
    return prisma.user.findMany({
      where: {
        organizationId,
        role: UserRole.AGENT,
      },

      select: {
        id: true,
        name: true,
        email: true,
        skills: true,
        isActive: true,
        createdAt: true,

        _count: {
          select: {
            assignedTickets: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

 async findById(
  id: string,
  organizationId: string,
) {
  return prisma.user.findFirst({
    where: {
      id,
      organizationId,
      role: UserRole.AGENT,
    },

    select: {
      id: true,
      name: true,
      email: true,
      skills: true,
      isActive: true,
      createdAt: true,

      assignedTickets: {
        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          subject: true,
          status: true,
          priority: true,
          createdAt: true,
        },
      },
    },
  });
}

  async create(data: {
    name: string;
    email: string;
    password: string;
    skills: string[];
    organizationId: string;
  }) {
    return prisma.user.create({
      data: {
        name: data.name,

        email: data.email,

        password: data.password,

        skills: data.skills,

        organizationId:
          data.organizationId,

        role: UserRole.AGENT,
      },
    });
  }

  async update(
    id: string,
    organizationId: string,
    data: {
      name?: string;
      skills?: string[];
      isActive?: boolean;
    },
  ) {
    return prisma.user.updateMany({
      where: {
        id,
        organizationId,
        role: UserRole.AGENT,
      },

      data,
    });
  }

  async delete(
    id: string,
    organizationId: string,
  ) {
    return prisma.user.updateMany({
      where: {
        id,
        organizationId,
        role: UserRole.AGENT,
      },

      data: {
        isActive: false,
      },
    });
  }
}

export const agentRepository =
  new AgentRepository();