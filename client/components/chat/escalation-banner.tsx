'use client';

import { AlertTriangle } from 'lucide-react';

interface Props {
  ticket: any;

  show: boolean;
}

export function EscalationBanner({
  ticket,
  show,
}: Props) {
  if (
    !show ||
    !ticket
  ) {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">

      <div className="flex items-center gap-3">

        <AlertTriangle
          size={20}
          className="text-yellow-500"
        />

        <div>

          <p className="font-medium text-yellow-400">
            AI escalated this conversation
          </p>

          <p className="text-sm text-yellow-300/80">
            Ticket #
            {ticket.id.slice(
              0,
              8,
            )}{' '}
            has been created and assigned
            to a support agent.
          </p>

        </div>

      </div>

    </div>
  );
}