'use client';

import {
  Briefcase,
  CheckCircle2,
  Clock3,
  User,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAgentWorkload } from '@/features/dashboard/use-agent-workload';

export function AgentWorkload() {
  const { data, isLoading } =
    useAgentWorkload();

    const router = useRouter();

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="text-muted-foreground">
          Loading workload...
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl p-8">

    <div className="mb-8 flex items-center justify-between">

  <div>

    <h2 className="text-2xl font-bold">
      Agent Workload
    </h2>

    <p className="mt-2 text-muted-foreground">
      Top 5 busiest support agents.
    </p>

  </div>

  <button
    onClick={() =>
      router.push('/agents')
    }
    className="rounded-xl border border-border px-4 py-2 text-sm transition hover:border-primary hover:text-primary"
  >
    View All
  </button>

</div>

      <div className="space-y-5">

        {data?.data.map(agent => (

          <div
            key={agent.id}
            className="rounded-2xl border border-border p-5 transition hover:border-primary/40"
          >

            <div className="mb-5 flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">

                <User
                  size={20}
                  className="text-primary"
                />

              </div>

              <div>

                <h3 className="font-semibold">
                  {agent.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {agent.email}
                </p>

              </div>

            </div>

            <div className="grid grid-cols-4 gap-4">

              <div>

                <div className="flex items-center gap-2 text-muted-foreground">

                  <Briefcase size={16} />

                  Total

                </div>

                <p className="mt-2 text-2xl font-bold">
                  {agent.totalTickets}
                </p>

              </div>

              <div>

                <div className="flex items-center gap-2 text-muted-foreground">

                  <Clock3 size={16} />

                  Open

                </div>

                <p className="mt-2 text-2xl font-bold">
                  {agent.open}
                </p>

              </div>

              <div>

                <div className="flex items-center gap-2 text-muted-foreground">

                  <Clock3 size={16} />

                  Progress

                </div>

                <p className="mt-2 text-2xl font-bold">
                  {agent.inProgress}
                </p>

              </div>

              <div>

                <div className="flex items-center gap-2 text-muted-foreground">

                  <CheckCircle2 size={16} />

                  Resolved

                </div>

                <p className="mt-2 text-2xl font-bold">
                  {agent.resolved}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}