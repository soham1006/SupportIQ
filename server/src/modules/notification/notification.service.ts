import { ApiError } from '../../utils/ApiError';
import { notificationRepository } from './notification.repository';
import {
  NotificationType,
} from '@prisma/client';

export class NotificationService {
  async getAll(
    userId: string,
  ) {
    return notificationRepository.findAll(
      userId,
    );
  }

  async getUnreadCount(
    userId: string,
  ) {
    return notificationRepository.getUnreadCount(
      userId,
    );
  }

  async markAsRead(
    id: string,
    userId: string,
  ) {
    const result =
      await notificationRepository.markAsRead(
        id,
        userId,
      );

    if (result.count === 0) {
      throw new ApiError(
        404,
        'Notification not found',
      );
    }
  }

  async markAllAsRead(
    userId: string,
  ) {
    await notificationRepository.markAllAsRead(
      userId,
    );
  }

  async create(data: {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
}) {
  return notificationRepository.create(
    data,
  );
}

async findAdmins(
  organizationId: string,
) {
  return notificationRepository.findAdmins(
    organizationId,
  );
}

}

export const notificationService =
  new NotificationService();