'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { useTickets } from '@/features/tickets/use-tickets';

function StatusBadge({
  status,
}: {
  status: string;
}) {
  switch (status) {
    case 'OPEN':
      return (
        <Badge variant="warning">
          Open
        </Badge>
      );

    case 'IN_PROGRESS':
      return (
        <Badge variant="info">
          In Progress
        </Badge>
      );

    case 'RESOLVED':
      return (
        <Badge variant="success">
          Resolved
        </Badge>
      );

    case 'CLOSED':
      return (
        <Badge variant="secondary">
          Closed
        </Badge>
      );

    default:
      return <Badge>{status}</Badge>;
  }
}

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  switch (priority) {
    case 'HIGH':
      return (
        <Badge variant="destructive">
          High
        </Badge>
      );

    case 'MEDIUM':
      return (
        <Badge variant="warning">
          Medium
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          Low
        </Badge>
      );
  }
}

interface Props {
  search: string;
  status: string;
  priority: string;
}

export function TicketsTable({
  search,
  status,
  priority,
}: Props) {
  const router = useRouter();

  const { data, isLoading } =
    useTickets();

  const tickets = data?.data ?? [];

  const filteredTickets =
    tickets.filter(ticket => {
      const matchesSearch =
        ticket.subject
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||
        ticket.customer.name
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          );

      const matchesStatus =
        status === 'ALL' ||
        ticket.status === status;

      const matchesPriority =
        priority === 'ALL' ||
        ticket.priority === priority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center text-muted-foreground">
        Loading tickets...
      </div>
    );
  }

  if (!filteredTickets.length) {
    return (
      <div className="flex h-80 items-center justify-center text-muted-foreground">
        No tickets found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b border-border text-left text-sm text-muted-foreground">

            <th className="px-6 py-4">
              Subject
            </th>

            <th>Customer</th>

            <th>Status</th>

            <th>Priority</th>

            <th>Agent</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {filteredTickets.map(ticket => (

            <tr
              key={ticket.id}
              onClick={() =>
                router.push(
                  `/tickets/${ticket.id}`,
                )
              }
              className="cursor-pointer border-b border-border transition-all duration-200 hover:bg-muted/40 hover:shadow-sm"
            >

              <td className="px-6 py-5">

                <div>

                  <p className="font-medium">
                    {ticket.subject}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    #{ticket.id.slice(0, 8)}
                  </p>

                </div>

              </td>

              <td>
                {ticket.customer.name}
              </td>

              <td>

                <StatusBadge
                  status={ticket.status}
                />

              </td>

              <td>

                <PriorityBadge
                  priority={ticket.priority}
                />

              </td>

              <td>

                {ticket.agent?.name ??
                  'Unassigned'}

              </td>

              <td>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    router.push(
                      `/tickets/${ticket.id}`,
                    );
                  }}
                  className="rounded-lg p-2 transition hover:bg-background"
                >

                  <ChevronRight
                    size={18}
                  />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}