'use client';

import { Badge } from '@/components/ui/badge';

interface Props {
  tickets: any[];
}

export function AssignedTicketsCard({
  tickets,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Assigned Tickets
      </h2>

      {tickets.length === 0 ? (
        <div className="text-muted-foreground">
          No tickets assigned.
        </div>
      ) : (
        <div className="space-y-4">

          {tickets.map(ticket => (

            <div
              key={ticket.id}
              className="rounded-xl border border-border p-4"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-semibold">
                    {ticket.subject}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    #{ticket.id.slice(0, 8)}
                  </p>

                </div>

                <Badge>
                  {ticket.status}
                </Badge>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}