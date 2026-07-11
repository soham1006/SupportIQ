'use client';

import {
  Briefcase,
  UserCheck,
  UserX,
  Users,
} from 'lucide-react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { useAgents } from '@/features/agents/use-agents';

export function AgentStats() {
  const {
    data,
    isLoading,
  } = useAgents();

  const agents =
    data?.data ?? [];

  const stats = [
    {
      title: 'Total Agents',
      value: agents.length,
      icon: Users,
    },
    {
      title: 'Active',
      value: agents.filter(
        (agent) => agent.isActive,
      ).length,
      icon: UserCheck,
    },
    {
      title: 'Inactive',
      value: agents.filter(
        (agent) => !agent.isActive,
      ).length,
      icon: UserX,
    },
    {
      title: 'Assigned Tickets',
      value: agents.reduce(
        (sum, agent) =>
          sum +
          agent._count.assignedTickets,
        0,
      ),
      icon: Briefcase,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="h-40 animate-pulse" />
          </Card>
        ))}

      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {

        const Icon = stat.icon;

        return (

          <Card
            key={stat.title}
            className="
              group
              overflow-hidden
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <CardContent className="relative p-7">

              {/* Glow */}

              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">

                    {stat.title}

                  </p>

                  <h2 className="mt-5 text-4xl font-semibold tracking-tight">

                    {stat.value}

                  </h2>

                </div>

                <div className="rounded-2xl bg-primary/10 p-4 transition-all duration-300 group-hover:scale-105">

                  <Icon
                    size={26}
                    className="text-primary"
                  />

                </div>

              </div>

            </CardContent>

          </Card>

        );

      })}

    </div>
  );
}