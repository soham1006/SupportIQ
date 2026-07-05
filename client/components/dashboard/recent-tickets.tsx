'use client';

import {
  ArrowRight,
  Clock3,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { useRecentTickets } from '@/features/dashboard/use-recent-tickets';import { StatusBadge } from './status-badge';
import { Ticket } from '@/features/tickets/types';

export function RecentTickets() {
  const { data, isLoading } = useRecentTickets();
  const router = useRouter();

  if (isLoading) {
    return (
      <Card className="space-y-4">
        <div className="h-8 w-56 animate-pulse rounded-xl bg-slate-800" />

        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl bg-slate-800"
          />
        ))}
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Recent Tickets
          </h2>

          <p className="mt-2 text-slate-400">
            Latest conversations requiring attention.
          </p>

        </div>

        <button
  onClick={() =>
    router.push('/tickets')
  }
  className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-emerald-500 hover:text-white"
>

  View All

</button>

      </div>

      <div className="space-y-4">

        {data?.data
  ?.slice(0, 3)
  .map((ticket: Ticket) => (

          <div
            key={ticket.id}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-800"
          >

            <div className="flex items-start justify-between">

              <div className="flex flex-1 gap-4">

                {/* Avatar */}

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 font-semibold text-white">

                  {ticket.customer.name
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>

                <div className="flex-1">

                  <div className="mb-2 flex items-center gap-3">

                    <h3 className="text-base font-semibold text-white">

                      {ticket.subject}

                    </h3>

                    <StatusBadge
                      status={ticket.status}
                    />

                  </div>

                  <p className="text-sm text-slate-400">

                    {ticket.customer.name}

                  </p>

                  <p className="text-sm text-slate-500">

                    {ticket.customer.email}

                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">

                    <Clock3 size={15} />

                    Ticket #{ticket.id.slice(0, 8)}

                  </div>

                </div>

              </div>

              <button
  onClick={() =>
    router.push(
      `/tickets/${ticket.id}`,
    )
  }
  className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-500 hover:text-white"
>

  Open

  <ArrowRight size={16} />

</button>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}