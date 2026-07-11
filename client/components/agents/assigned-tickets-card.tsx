'use client';

import {
  Ticket,
  Hash,
} from 'lucide-react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
  tickets: any[];
}

function getBadgeVariant(status: string) {
  switch (status) {
    case 'OPEN':
      return 'warning';

    case 'IN_PROGRESS':
      return 'info';

    case 'RESOLVED':
      return 'success';

    case 'CLOSED':
      return 'secondary';

    default:
      return 'secondary';
  }
}

export function AssignedTicketsCard({
  tickets,
}: Props) {
  return (
    <Card>

      <CardContent className="p-7">

        <div className="mb-8">

          <h2 className="text-2xl font-semibold">

            Assigned Tickets

          </h2>

          <p className="mt-2 text-muted-foreground">

            Tickets currently assigned to this agent.

          </p>

        </div>

        {tickets.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-16 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">

              <Ticket
                size={28}
                className="text-muted-foreground"
              />

            </div>

            <h3 className="mt-5 text-lg font-semibold">

              No assigned tickets

            </h3>

            <p className="mt-2 max-w-sm text-muted-foreground">

              This agent doesn't have any tickets assigned yet.

            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {tickets.map((ticket) => (

              <div
                key={ticket.id}
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-muted/30
                  p-5
                  transition-all
                  duration-300
                  hover:border-primary/30
                  hover:bg-muted/50
                "
              >

                <div className="flex items-start justify-between gap-6">

                  <div>

                    <h3 className="font-semibold">

                      {ticket.subject}

                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">

                      <Hash size={14} />

                      {ticket.id.slice(0, 8)}

                    </div>

                  </div>

                  <Badge
                    variant={getBadgeVariant(ticket.status)}
                  >
                    {ticket.status.replace('_', ' ')}
                  </Badge>

                </div>

              </div>

            ))}

          </div>

        )}

      </CardContent>

    </Card>
  );
}