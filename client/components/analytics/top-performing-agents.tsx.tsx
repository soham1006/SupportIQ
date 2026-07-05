'use client';

import {
  ArrowRight,
  Award,
  Mail,
  Trophy,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';

import { useTopAgents } from '@/features/analytics/use-top-agents';

export function TopPerformingAgents () {
  const router = useRouter();

  const {
    data,
    isLoading,
  } = useTopAgents();

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-muted-foreground">
          Loading...
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Top Performing Agents
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Ranked by resolved tickets.
          </p>

        </div>

        <button
          onClick={() =>
            router.push('/agents')
          }
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm transition hover:border-primary hover:text-primary"
        >
          View All

          <ArrowRight size={16} />
        </button>

      </div>

      <div className="space-y-4">

        {data?.data.map(
          (agent, index) => (
            <div
              key={agent.id}
              className="flex items-center justify-between rounded-xl border border-border p-4 transition hover:border-primary/40"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">

                  {index === 0 ? (
                    <Trophy
                      size={20}
                      className="text-yellow-500"
                    />
                  ) : (
                    <Award
                      size={20}
                      className="text-primary"
                    />
                  )}

                </div>

                <div>

                  <p className="font-semibold">
                    {agent.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

                    <Mail size={14} />

                    {agent.email}

                  </div>

                </div>

              </div>

              <div className="text-right">

                <p className="text-2xl font-bold text-primary">
                  {agent.resolved}
                </p>

                <p className="text-sm text-muted-foreground">
                  Resolved
                </p>

              </div>

            </div>
          ),
        )}

      </div>

    </Card>
  );
}