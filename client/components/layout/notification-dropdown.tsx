'use client';

import {
  Bell,
  CheckCircle2,
  FileText,
  Ticket,
  UserPlus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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
  const { data, isLoading } = useNotifications();

  const markAll = useMarkAllRead();
  const markRead = useMarkRead();

  if (isLoading) {
    return (
      <div className="absolute right-0 top-12 z-50 w-96 rounded-2xl border border-border bg-card shadow-xl">

        <div className="space-y-4 p-6">

          <Skeleton className="h-6 w-40" />

          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-20 rounded-xl"
            />
          ))}

        </div>

      </div>
    );
  }

  const notifications = data?.data ?? [];

  return (
    <div className="absolute right-0 top-12 z-50 w-96 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-border px-5 py-4">

        <div>

          <h3 className="font-semibold">
            Notifications
          </h3>

          <p className="text-xs text-muted-foreground">
            {notifications.length} notification{notifications.length !== 1 && 's'}
          </p>

        </div>

        {notifications.length > 0 && (

          <Button
            variant="ghost"
            size="sm"
            disabled={markAll.isPending}
            onClick={() => markAll.mutate()}
          >
            Mark all
          </Button>

        )}

      </div>

      {notifications.length === 0 ? (

        <div className="flex flex-col items-center justify-center gap-3 p-10">

          <div className="rounded-2xl border border-border bg-muted p-4">

            <Bell className="text-muted-foreground" />

          </div>

          <p className="font-medium">
            You are all caught up
          </p>

          <p className="text-sm text-muted-foreground">
            No notifications yet.
          </p>

        </div>

      ) : (

        <div className="max-h-[430px] overflow-y-auto p-2">

          {notifications.map((notification) => {

            const Icon = getIcon(notification.type);

            return (

              <button
                key={notification.id}
                onClick={() => {
                  if (!notification.isRead) {
                    markRead.mutate(notification.id);
                  }
                }}
                className={`
                  mb-2
                  flex
                  w-full
                  items-start
                  gap-4

                  rounded-xl

                  p-3

                  text-left

                  transition-all
                  duration-200

                  hover:bg-accent

                  ${
                    !notification.isRead
                      ? 'bg-primary/5 border border-primary/10'
                      : ''
                  }
                `}
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-border

                    bg-muted
                  "
                >

                  <Icon
                    size={18}
                    className="text-primary"
                  />

                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">

                    <p className="truncate font-medium">

                      {notification.title}

                    </p>

                    {!notification.isRead && (

                      <span className="h-2 w-2 rounded-full bg-primary" />

                    )}

                  </div>

                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">

                    {notification.message}

                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">

                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

              </button>

            );

          })}

        </div>

      )}

    </div>
  );
}