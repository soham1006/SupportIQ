'use client';

import {
  CheckCircle2,
  Clock3,
  MessageSquare,
  UserCheck,
} from 'lucide-react';

interface Props {
  ticket: any;
}

export function TimelineCard({
  ticket,
}: Props) {
  const events = [
    {
      title: 'Ticket Created',
      time: ticket.createdAt,
      icon: Clock3,
    },

    ticket.assignedAgent && {
      title: `Assigned to ${ticket.assignedAgent.name}`,
      time: ticket.updatedAt,
      icon: UserCheck,
    },

    ...(ticket.replies ?? []).map(
      (reply: any) => ({
        title: `${reply.user.name} replied`,
        time: reply.createdAt,
        icon: MessageSquare,
      }),
    ),

    ticket.status === 'RESOLVED' && {
      title: 'Ticket Resolved',
      time: ticket.updatedAt,
      icon: CheckCircle2,
    },
  ].filter(Boolean);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">

      <h2 className="mb-6 text-lg font-semibold">
        Timeline
      </h2>

      <div className="space-y-6">

        {events.map(
          (event: any, index) => {
            const Icon =
              event.icon;

            return (
              <div
                key={index}
                className="flex gap-4"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">

                  <Icon
                    size={18}
                    className="text-primary"
                  />

                </div>

                <div>

                  <p className="font-medium">
                    {event.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(
                      event.time,
                    ).toLocaleString()}
                  </p>

                </div>

              </div>
            );
          },
        )}

      </div>

    </div>
  );
}