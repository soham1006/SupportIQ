'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Skeleton } from '@/components/ui/skeleton';

import { useAgents } from '@/features/agents/use-agents';

import { AgentCard } from './agent-card';
import { AgentStats } from './agent-stats';
import { CreateAgentDialog } from './create-agent-dialog';

export function AgentsPage() {
  const {
    data,
    isLoading,
  } = useAgents();

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Agents
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage your customer support team.
            </p>

          </div>

          <CreateAgentDialog />

        </div>

        <AgentStats />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {isLoading ? (

            [...Array(6)].map((_, index) => (

              <Skeleton
                key={index}
                className="h-[420px] rounded-3xl"
              />

            ))

          ) : (

            data?.data.map((agent) => (

              <AgentCard
                key={agent.id}
                agent={agent}
              />

            ))

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}