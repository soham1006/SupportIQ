'use client';

import {
  ArrowRight,
  Award,
  Mail,
  Trophy,
  User,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';

import { useTopAgents } from '@/features/analytics/use-top-agents';

export function TopPerformingAgents() {
  const router = useRouter();

  const {
    data,
    isLoading,
  } = useTopAgents();

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-semibold tracking-tight">

            Top Performing Agents

          </h2>

          <p className="mt-2 text-muted-foreground">

            Ranked by successfully resolved support tickets.

          </p>

        </div>

        <button
          onClick={() =>
            router.push('/agents')
          }
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-border
            bg-background
            px-5
            py-3
            text-sm
            font-medium
            transition-all
            hover:border-primary
            hover:text-primary
          "
        >

          View All

          <ArrowRight size={16} />

        </button>

      </div>

      {/* Leaderboard */}

      <div className="space-y-5">

        {data?.data.map((agent, index) => (

          <div
            key={agent.id}
            className="
              group
              flex
              items-center
              justify-between
              rounded-3xl
              border
              border-border
              bg-background
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary/30
              hover:shadow-lg
            "
          >

            <div className="flex items-center gap-5">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                "
              >

                {index === 0 ? (

                  <Trophy
                    size={24}
                    className="text-amber-500"
                  />

                ) : index === 1 ? (

                  <Award
                    size={24}
                    className="text-slate-400"
                  />

                ) : index === 2 ? (

                  <Award
                    size={24}
                    className="text-orange-500"
                  />

                ) : (

                  <User
                    size={24}
                    className="text-primary"
                  />

                )}

              </div>

              <div>

                <h3 className="text-lg font-semibold">

                  {agent.name}

                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">

                  <Mail size={14} />

                  {agent.email}

                </div>

              </div>

            </div>

            <div className="text-right">

              <p className="text-4xl font-semibold tracking-tight">

                {agent.resolved}

              </p>

              <p className="mt-1 text-sm text-muted-foreground">

                Tickets Resolved

              </p>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}