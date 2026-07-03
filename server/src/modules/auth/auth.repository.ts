import { Prisma, RefreshToken, User } from '@prisma/client';
import { prisma } from '../../database/prisma';

export class AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

async findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      organization: true,
    },
  });
}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async saveRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        token,
        expiresAt,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findRefreshToken(
    token: string,
  ): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: {
        token,
      },
    });
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        token,
      },
    });
  }

  async deleteAllUserRefreshTokens(
    userId: string,
  ): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }

  async replaceRefreshToken(
  oldToken: string,
  newToken: string,
  expiresAt: Date,
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const existing = await tx.refreshToken.findUnique({
      where: {
        token: oldToken,
      },
    });

    if (!existing) {
      throw new Error('Refresh token not found');
    }

    await tx.refreshToken.delete({
      where: {
        token: oldToken,
      },
    });

    await tx.refreshToken.create({
      data: {
        token: newToken,
        expiresAt,
        userId: existing.userId,
      },
    });
  });
}

async updateSkills(
  userId: string,
  skills: string[],
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      skills,
    },
  });
}
}



export const authRepository = new AuthRepository();