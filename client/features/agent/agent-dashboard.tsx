'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';

export function AgentDashboard() {
  return (
    <DashboardLayout>

      <PageContainer>

        <PageHeader
          title="Agent Dashboard"
          description="Manage assigned tickets."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Assigned"
            value="12"
          />

          <StatCard
            title="Open"
            value="7"
          />

          <StatCard
            title="Resolved Today"
            value="5"
          />

          <StatCard
            title="Escalated"
            value="2"
          />

        </div>

      </PageContainer>

    </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6">

      <p className="text-sm text-muted-foreground">

        {title}

      </p>

      <h2 className="mt-2 text-3xl font-bold">

        {value}

      </h2>

    </div>
  );
}