'use client';

import { Plus } from 'lucide-react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { useAgents } from '@/features/agents/use-agents';
import { AgentStats } from './agent-stats';
import { AgentCard } from './agent-card';

export function AgentsPage() {

    const { data, isLoading } =
  useAgents();
  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-semibold">
              Agents
            </h1>

            <p className="mt-1 text-muted-foreground">
              Manage your customer support team.
            </p>

          </div>

          <Button>

            <Plus size={18} />

            Add Agent

          </Button>

        </div>

        <AgentStats />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
{isLoading ? (
  <p>Loading agents...</p>
) : (
  data?.data.map(agent => (
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