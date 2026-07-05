'use client';

import {
  ArrowRight,
  Mail,
  Ticket,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Agent } from '@/features/agents/types';
import { useRouter } from 'next/navigation';

interface Props {
  agent: Agent;
}

export function AgentCard({
  agent,
}: Props) {
  const status = agent.isActive
    ? 'ONLINE'
    : 'OFFLINE';

  const router = useRouter();


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
              Agent
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <span
            className={`h-2.5 w-2.5 rounded-full ${
              status === 'ONLINE'
                ? 'bg-emerald-500'
                : 'bg-slate-400'
            }`}
          />

          <span
            className={`text-sm font-medium ${
              status === 'ONLINE'
                ? 'text-emerald-500'
                : 'text-slate-400'
            }`}
          >
            {status}
          </span>

        </div>

      </div>

      {/* Email */}

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">

        <Mail size={16} />

        {agent.email}

      </div>

      {/* Skills */}

      <div className="mt-6">

        <p className="mb-2 text-sm text-muted-foreground">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {agent.skills.length > 0 ? (
            agent.skills.map(skill => (
              <span
                key={skill}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No skills added
            </span>
          )}

        </div>

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
              Assigned
            </span>

          </div>

          <h4 className="mt-3 text-2xl font-bold">
            {agent._count.assignedTickets}
          </h4>

        </div>

        <div className="rounded-xl bg-muted p-4">

          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <h4 className="mt-3 text-lg font-bold">
            {status}
          </h4>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8">

        <Button
  className="w-full justify-center rounded-xl"
  variant="outline"
  onClick={() =>
    router.push(
      `/agents/${agent.id}`,
    )
  }
>
  View Profile
  <ArrowRight size={16} />
</Button>

      </div>

    </div>
  );
}