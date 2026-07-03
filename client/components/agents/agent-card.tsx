'use client';

import {
  ArrowRight,
  Mail,
  Ticket,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Agent } from '@/features/agents/types';

interface Props {
  agent: Agent;
}

export function AgentCard({
  agent,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">

            <User
              size={26}
              className="text-primary"
            />

          </div>

          <div>

            <h3 className="text-lg font-semibold">
              {agent.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {agent.role}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

  <span
    className={`h-2.5 w-2.5 rounded-full ${
      agent.status === 'ONLINE'
        ? 'bg-emerald-500'
        : agent.status === 'BUSY'
        ? 'bg-yellow-500'
        : 'bg-slate-400'
    }`}
  />

  <span
    className={`text-sm font-medium ${
      agent.status === 'ONLINE'
        ? 'text-emerald-500'
        : agent.status === 'BUSY'
        ? 'text-yellow-500'
        : 'text-slate-400'
    }`}
  >
    {agent.status}
  </span>

</div>

      </div>

      {/* Email */}

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">

        <Mail size={16} />

        {agent.email}

      </div>

      {/* Stats */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-muted p-4">

          <div className="flex items-center gap-2">

            <Ticket
              size={18}
              className="text-primary"
            />

            <span className="text-sm text-muted-foreground">
              Active
            </span>

          </div>

          <h4 className="mt-3 text-2xl font-bold">
            {agent.activeTickets}
          </h4>

        </div>

        <div className="rounded-xl bg-muted p-4">

          <p className="text-sm text-muted-foreground">
            Resolved
          </p>

          <h4 className="mt-3 text-2xl font-bold">
            {agent.resolvedTickets}
          </h4>

        </div>

      </div>

      {/* Satisfaction */}

      <div className="mt-8">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm text-muted-foreground">
            Satisfaction
          </span>

          <span className="font-semibold text-primary">
           {agent.satisfaction}%
          </span>

        </div>

        <div className="h-2 rounded-full bg-muted">

          <div className="h-full w-[98%] rounded-full bg-primary" />

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8">

        <Button className="w-full justify-center rounded-xl">

          View Profile

          <ArrowRight size={16} />

        </Button>

      </div>

    </div>
  );
}