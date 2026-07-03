'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

import { AnalyticsStats } from './analytics-stats';
import { TicketTrendChart } from './ticket-trend-chart';
import { CategoryChart } from './category-chart';
import { RecentActivity } from './recent-activity';
import { PerformanceMetrics } from './performance-metrics';
export function AnalyticsPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-semibold">
            Analytics
          </h1>

          <p className="mt-1 text-muted-foreground">
            Monitor support performance and AI metrics.
          </p>

        </div>

        <AnalyticsStats />

        <div className="grid gap-6 xl:grid-cols-2">

          <TicketTrendChart />

          <CategoryChart />

        </div>

        <RecentActivity />

      </div>

      <AnalyticsStats />

<div className="grid gap-6 xl:grid-cols-2">
  <TicketTrendChart />
  <CategoryChart />
</div>

<PerformanceMetrics />

<RecentActivity />

    </DashboardLayout>
  );
}