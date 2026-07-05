'use client';

import {
  Users,
  UserCheck,
  UserX,
  Briefcase,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

import { useAgents } from '@/features/agents/use-agents';

export function AgentStats() {
  const { data, isLoading } =
    useAgents();

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
        agent => agent.isActive,
      ).length,
      icon: UserCheck,
    },
    {
      title: 'Inactive',
      value: agents.filter(
        agent => !agent.isActive,
      ).length,
      icon: UserX,
    },
    {
      title: 'Assigned Tickets',
      value: agents.reduce(
        (sum, agent) =>
          sum +
          agent._count
            .assignedTickets,
        0,
      ),
      icon: Briefcase,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map(stat => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between p-6">

              <div>

                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {isLoading
                    ? '--'
                    : stat.value}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">

                <Icon
                  size={24}
                  className="text-primary"
                />

              </div>

            </div>
          </Card>
        );
      })}

    </div>
  );
}