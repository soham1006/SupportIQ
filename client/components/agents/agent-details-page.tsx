'use client';

import {
  ArrowLeft,
  User,
} from 'lucide-react';

import {
  useParams,
  useRouter,
} from 'next/navigation';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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

        <div className="space-y-8">

          <Skeleton className="h-10 w-44" />

          <div className="grid gap-6 xl:grid-cols-[340px_1fr]">

            <Skeleton className="h-[520px]" />

            <Skeleton className="h-[520px]" />

          </div>

        </div>

      </DashboardLayout>
    );
  }

  if (!agent) {
    return (
      <DashboardLayout>

        <div className="flex h-[60vh] flex-col items-center justify-center">

          <User
            size={48}
            className="text-muted-foreground"
          />

          <h2 className="mt-5 text-2xl font-semibold">

            Agent not found

          </h2>

          <p className="mt-2 text-muted-foreground">

            The requested agent does not exist.

          </p>

          <Button
            className="mt-6"
            onClick={() =>
              router.push('/agents')
            }
          >
            Back to Agents
          </Button>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <Button
            variant="ghost"
            className="-ml-2"
            onClick={() =>
              router.push('/agents')
            }
          >
            <ArrowLeft size={18} />

            Back to Agents

          </Button>

          <div className="mt-5">

            <h1 className="text-4xl font-semibold tracking-tight">

              {agent.name}

            </h1>

            <p className="mt-2 text-muted-foreground">

              {agent.email}

            </p>

          </div>

        </div>

        {/* Content */}

        <div className="grid gap-6 xl:grid-cols-[340px_1fr]">

          <AgentInfoCard
            agent={agent}
          />

          <AssignedTicketsCard
            tickets={agent.assignedTickets}
          />

        </div>

      </div>

    </DashboardLayout>
  );
}