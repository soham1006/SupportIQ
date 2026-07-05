import { api } from '@/lib/api';

import {
  NotificationsResponse,
  UnreadCountResponse,
} from './types';

export async function getNotifications() {
  const { data } =
    await api.get<NotificationsResponse>(
      '/notifications',
    );

  return data;
}

export async function getUnreadCount() {
  const { data } =
    await api.get<UnreadCountResponse>(
      '/notifications/unread-count',
    );

  return data;
}

export async function markAsRead(
  id: string,
) {
  const { data } =
    await api.patch(
      `/notifications/${id}/read`,
    );

  return data;
}

export async function markAllAsRead() {
  const { data } =
    await api.patch(
      '/notifications/read-all',
    );

  return data;
}