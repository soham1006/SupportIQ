'use client';

import {
  CircleCheckBig,
  CircleDot,
  Clock3,
  TicketCheck,
} from 'lucide-react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';

import { useAgentDashboardStats } from './use-agent-dashboard-stats';

export function AgentDashboard() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useAgentDashboardStats();

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title="Agent Dashboard"
          description="Manage your assigned tickets and track their progress."
        />

        {isError ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
            Unable to load dashboard statistics.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Assigned"
              value={
                stats?.assigned ?? 0
              }
              icon={TicketCheck}
              loading={isLoading}
            />

            <StatCard
              title="Open"
              value={
                stats?.open ?? 0
              }
              icon={CircleDot}
              loading={isLoading}
            />

            <StatCard
              title="In Progress"
              value={
                stats?.inProgress ?? 0
              }
              icon={Clock3}
              loading={isLoading}
            />

            <StatCard
              title="Resolved"
              value={
                stats?.resolved ?? 0
              }
              icon={CircleCheckBig}
              loading={isLoading}
            />
          </div>
        )}
      </PageContainer>
    </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  loading,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <Icon
            size={19}
            className="text-primary"
          />
        </div>
      </div>

      {loading ? (
        <Skeleton className="mt-5 h-9 w-16" />
      ) : (
        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          {value}
        </h2>
      )}
    </div>
  );
}