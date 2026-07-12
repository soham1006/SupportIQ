import {
  UserRole,
} from '@prisma/client';

import { prisma } from '../../database/prisma';

export class CustomerRepository {
  async findAll(
    organizationId: string,
  ) {
    return prisma.user.findMany({
      where: {
        organizationId,
        role: UserRole.CUSTOMER,
      },

      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,

        _count: {
          select: {
            customerTickets: true,
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
        role: UserRole.CUSTOMER,
      },

      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,

        customerTickets: {
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

  async findByEmail(
    email: string,
  ) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    organizationId: string;
  }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,

        organizationId:
          data.organizationId,

        role: UserRole.CUSTOMER,
      },

      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async update(
    id: string,
    organizationId: string,
    data: {
      name?: string;
      isActive?: boolean;
    },
  ) {
    return prisma.user.updateMany({
      where: {
        id,
        organizationId,
        role: UserRole.CUSTOMER,
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
        role: UserRole.CUSTOMER,
      },

      data: {
        isActive: false,
      },
    });
  }
}

export const customerRepository =
  new CustomerRepository();