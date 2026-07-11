'use client';

import { BarChart3 } from 'lucide-react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

import { AnalyticsStats } from './analytics-stats';
import { TicketTrendChart } from './ticket-trend-chart';
import { TicketStatusChart } from './ticket-status-chart';
import { PerformanceMetrics } from './performance-metrics';
import { TopPerformingAgents } from './top-performing-agents.tsx';

export function AnalyticsPage() {
  return (
    <DashboardLayout>

      <div className="space-y-10">

        {/* Hero */}

        <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">

              <BarChart3
                size={16}
                className="text-primary"
              />

              <span className="text-sm font-medium text-primary">

                Analytics Dashboard

              </span>

            </div>

            <h1 className="text-5xl font-semibold tracking-tight">

              Insights & Performance

            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">

              Monitor ticket trends, AI performance,
              customer satisfaction and agent productivity
              from one unified dashboard.

            </p>

          </div>

        </section>

        <AnalyticsStats />

        <div className="grid gap-8 xl:grid-cols-2">

          <TicketTrendChart />

          <TicketStatusChart />

        </div>

        <PerformanceMetrics />

        <TopPerformingAgents />

      </div>

    </DashboardLayout>
  );
}