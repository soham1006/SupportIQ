'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageHeader } from '@/components/ui/page-header';
import { AddAgentDialog } from '@/components/agent/add-agent-dialog';
import { useAgents } from '@/features/agent/use-agents';
import { AgentTable } from '@/components/agent/agent-table';

export default function AgentsPage() {
  const {
    data,
    isLoading,
  } = useAgents();

  if (isLoading) {
    return (
      <DashboardLayout>

        <div className="flex h-64 items-center justify-center">
          Loading agents...
        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

       <div className="flex items-center justify-between">

  <PageHeader
    title="Agents"
    description="Manage support agents."
  />

  <AddAgentDialog />

</div>

        <AgentTable
          agents={data.data}
        />

      </div>

    </DashboardLayout>
  );
}