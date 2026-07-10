'use client';

import {
  ArrowRight,
  Clock3,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useRecentTickets } from '@/features/dashboard/use-recent-tickets';
import { Ticket } from '@/features/tickets/types';

import { StatusBadge } from './status-badge';

export function RecentTickets() {
  const { data, isLoading } = useRecentTickets();
  const router = useRouter();

  if (isLoading) {
    return (
      <Card className="space-y-5 p-6">

        <Skeleton className="h-8 w-56" />

        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className="h-28 rounded-2xl"
          />
        ))}

      </Card>
    );
  }

  return (
    <Card className="p-8">

      <div className="mb-8 flex items-end justify-between">

        <div>

          <h2 className="text-2xl font-semibold tracking-tight">
            Recent Tickets
          </h2>

          <p className="mt-2 text-muted-foreground">
            Latest conversations requiring attention.
          </p>

        </div>

        <Button
          variant="outline"
          onClick={() =>
            router.push('/tickets')
          }
        >
          View All
        </Button>

      </div>

      <div className="space-y-4">

        {data?.data
          ?.slice(0, 3)
          .map((ticket: Ticket) => (

            <div
              key={ticket.id}
              className="
                group

                rounded-2xl

                border
                border-border

                bg-background/40

                p-5

                transition-all
                duration-200

                hover:border-primary/25
                hover:bg-accent/40
              "
            >

              <div className="flex items-start justify-between gap-6">

                <div className="flex flex-1 gap-4">

                  <Avatar size="lg">

                    <AvatarFallback>

                      {ticket.customer.name
                        ?.charAt(0)
                        ?.toUpperCase()}

                    </AvatarFallback>

                  </Avatar>

                  <div className="min-w-0 flex-1">

                    <div className="mb-2 flex flex-wrap items-center gap-3">

                      <h3 className="truncate text-base font-semibold">

                        {ticket.subject}

                      </h3>

                      <StatusBadge
                        status={ticket.status}
                      />

                    </div>

                    <p className="text-sm font-medium">

                      {ticket.customer.name}

                    </p>

                    <p className="text-sm text-muted-foreground">

                      {ticket.customer.email}

                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">

                      <Clock3 size={15} />

                      <span>
                        Ticket #{ticket.id.slice(0, 8)}
                      </span>

                    </div>

                  </div>

                </div>

                <Button
                  variant="ghost"
                  onClick={() =>
                    router.push(`/tickets/${ticket.id}`)
                  }
                >
                  Open

                  <ArrowRight size={16} />
                </Button>

              </div>

            </div>

          ))}

      </div>

    </Card>
  );
}