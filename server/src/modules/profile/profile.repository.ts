import { prisma } from '../../database/prisma';

export class ProfileRepository {
  async findById(
    id: string,
  ) {
    return prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,

        organizationId: true,

        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findUserWithPassword(
    id: string,
  ) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateProfile(
    id: string,
    name: string,
  ) {
    return prisma.user.update({
      where: {
        id,
      },

      data: {
        name,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,

        organizationId: true,

        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async updatePassword(
    id: string,
    password: string,
  ) {
    return prisma.user.update({
      where: {
        id,
      },

      data: {
        password,
      },
    });
  }
}

export const profileRepository =
  new ProfileRepository();