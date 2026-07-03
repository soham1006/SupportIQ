'use client';

import {
  AlertCircle,
  Clock3,
  CheckCircle2,
  Ticket,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { useTickets } from '@/features/tickets/use-tickets';

export function TicketStats() {
  const { data } = useTickets();

  const tickets = data?.data ?? [];

  const total = tickets.length;

  const open = tickets.filter(
    t => t.status === 'OPEN',
  ).length;

  const progress = tickets.filter(
    t => t.status === 'IN_PROGRESS',
  ).length;

  const resolved = tickets.filter(
    t => t.status === 'RESOLVED',
  ).length;

  const stats = [
    {
      title: 'Total',
      value: total,
      icon: Ticket,
    },
    {
      title: 'Open',
      value: open,
      icon: AlertCircle,
    },
    {
      title: 'In Progress',
      value: progress,
      icon: Clock3,
    },
    {
      title: 'Resolved',
      value: resolved,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map(stat => (
        <Card key={stat.title}>

          <div className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {stat.value}
              </h2>

            </div>

            <stat.icon
              className="text-primary"
              size={30}
            />

          </div>

        </Card>
      ))}

    </div>
  );
}