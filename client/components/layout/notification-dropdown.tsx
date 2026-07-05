'use client';

import {
  Bell,
  CheckCircle2,
  FileText,
  Ticket,
  UserPlus,
} from 'lucide-react';

import { useNotifications } from '@/features/notifications/use-notifications';
import { useMarkAllRead } from '@/features/notifications/use-mark-all-read';
import { useMarkRead } from '@/features/notifications/use-mark-read';

function getIcon(type: string) {
  switch (type) {
    case 'NEW_TICKET':
    case 'TICKET_ASSIGNED':
      return Ticket;

    case 'TICKET_RESOLVED':
      return CheckCircle2;

    case 'DOCUMENT_UPLOADED':
      return FileText;

    case 'AGENT_CREATED':
      return UserPlus;

    default:
      return Bell;
  }
}

export function NotificationDropdown() {
  const {
    data,
    isLoading,
  } = useNotifications();

  const markAll =
    useMarkAllRead();

  const markRead =
    useMarkRead();

  if (isLoading) {
    return (
      <div className="absolute right-0 top-12 z-50 w-96 rounded-2xl border border-border bg-card shadow-xl">

        <div className="p-6 text-center">

          Loading notifications...

        </div>

      </div>
    );
  }

  const notifications =
    data?.data ?? [];

  return (
    <div className="absolute right-0 top-12 z-50 w-96 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">

      <div className="flex items-center justify-between border-b border-border p-4">

        <h3 className="font-semibold">
          Notifications
        </h3>

        {notifications.length >
          0 && (
          <button
            disabled={
              markAll.isPending
            }
            onClick={() =>
              markAll.mutate()
            }
            className="text-sm text-primary hover:underline disabled:opacity-50"
          >
            Mark all
          </button>
        )}

      </div>

      {notifications.length ===
      0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">

          No notifications yet.

        </div>
      ) : (
        <div className="max-h-[420px] overflow-y-auto">

          {notifications.map(
            notification => {
              const Icon =
                getIcon(
                  notification.type,
                );

              return (
                <button
                  key={
                    notification.id
                  }
                  onClick={() => {
                    if (
                      !notification.isRead
                    ) {
                      markRead.mutate(
                        notification.id,
                      );
                    }
                  }}
                  className={`flex w-full items-start gap-4 border-b border-border p-4 text-left transition hover:bg-muted ${
                    !notification.isRead
                      ? 'bg-primary/5'
                      : ''
                  }`}
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">

                    <Icon
                      size={18}
                      className="text-primary"
                    />

                  </div>

                  <div className="flex-1">

                    <p className="font-medium">

                      {
                        notification.title
                      }

                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">

                      {
                        notification.message
                      }

                    </p>

                    <p className="mt-2 text-xs text-muted-foreground">

                      {new Date(
                        notification.createdAt,
                      ).toLocaleString()}

                    </p>

                  </div>

                </button>
              );
            },
          )}

        </div>
      )}

    </div>
  );
}