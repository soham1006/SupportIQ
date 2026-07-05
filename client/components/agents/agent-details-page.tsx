'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';

import { useAgent } from '@/features/agents/use-agent';

import { AgentInfoCard } from './agent-info-card';
import { AssignedTicketsCard } from './assigned-tickets-card';

export function AgentDetailsPage() {
  const router = useRouter();

  const params = useParams();

  const agentId = params.id as string;

  const { data, isLoading } =
    useAgent(agentId);

  const agent = data?.data;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          Loading agent...
        </div>
      </DashboardLayout>
    );
  }

  if (!agent) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          Agent not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <Button
            variant="ghost"
            onClick={() =>
              router.push('/agents')
            }
          >
            <ArrowLeft size={18} />

            Back

          </Button>

          <h1 className="mt-4 text-3xl font-bold">
            {agent.name}
          </h1>

          <p className="text-muted-foreground">
            {agent.email}
          </p>

        </div>

        <div className="grid gap-6 xl:grid-cols-[350px_1fr]">

          <AgentInfoCard
            agent={agent}
          />

          <AssignedTicketsCard
            tickets={
              agent.assignedTickets
            }
          />

        </div>

      </div>

    </DashboardLayout>
  );
}