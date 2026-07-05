import { prisma } from '../../database/prisma';
import {
  NotificationType,
} from '@prisma/client';
import { UserRole } from '@prisma/client';

export class NotificationRepository {
  async findAll(
    userId: string,
  ) {
    return prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 20,
    });
  }

  async getUnreadCount(
    userId: string,
  ) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  async markAsRead(
    id: string,
    userId: string,
  ) {
    return prisma.notification.updateMany({
      where: {
        id,
        userId,
      },

      data: {
        isRead: true,
      },
    });
  }

  async markAllAsRead(
    userId: string,
  ) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },

      data: {
        isRead: true,
      },
    });
  }

  async create(data: {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
}) {
  return prisma.notification.create({
    data: {
      user: {
        connect: {
          id: data.userId,
        },
      },

      title: data.title,

      message: data.message,

      type: data.type,
    },
  });
}

async findAdmins(
  organizationId: string,
) {
  return prisma.user.findMany({
    where: {
      organizationId,
      role: UserRole.ADMIN,
      isActive: true,
    },

    select: {
      id: true,
    },
  });
}

}

export const notificationRepository =
  new NotificationRepository();