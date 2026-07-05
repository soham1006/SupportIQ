'use client';

import {
  Brain,
  CheckCircle,
  Clock3,
  TrendingUp,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

import { useOverview } from '@/features/analytics/use-overview';

export function PerformanceMetrics() {
  const { data, isLoading } =
    useOverview();

  if (isLoading) {
    return (
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="h-80 animate-pulse" />
        <Card className="h-80 animate-pulse" />
      </div>
    );
  }

  const aiMetrics = [
    {
      label: 'Average AI Confidence',
      value: `${data?.data.averageAIConfidence ?? 0}%`,
    },
    {
      label: 'Resolution Rate',
      value: `${data?.data.resolutionRate ?? 0}%`,
    },
  ];

  const ticketMetrics = [
    {
      label: 'Open Tickets',
      value: data?.data.openTickets ?? 0,
    },
    {
      label: 'Closed Tickets',
      value: data?.data.closedTickets ?? 0,
    },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-2">

      <Card className="p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">

            <Brain
              size={22}
              className="text-primary"
            />

          </div>

          <div>

            <h2 className="text-xl font-semibold">
              AI Metrics
            </h2>

            <p className="text-sm text-muted-foreground">
              AI performance overview.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          {aiMetrics.map(metric => (

            <div
              key={metric.label}
              className="flex items-center justify-between rounded-xl bg-muted/40 p-4"
            >

              <span className="text-muted-foreground">
                {metric.label}
              </span>

              <span className="font-semibold text-primary">
                {metric.value}
              </span>

            </div>

          ))}

        </div>

      </Card>

      <Card className="p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">

            <TrendingUp
              size={22}
              className="text-primary"
            />

          </div>

          <div>

            <h2 className="text-xl font-semibold">
              Ticket Metrics
            </h2>

            <p className="text-sm text-muted-foreground">
              Current support workload.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          {ticketMetrics.map(metric => (

            <div
              key={metric.label}
              className="flex items-center justify-between rounded-xl bg-muted/40 p-4"
            >

              <div className="flex items-center gap-2">

                {metric.label ===
                'Open Tickets' ? (
                  <Clock3
                    size={16}
                    className="text-primary"
                  />
                ) : (
                  <CheckCircle
                    size={16}
                    className="text-primary"
                  />
                )}

                <span className="text-muted-foreground">
                  {metric.label}
                </span>

              </div>

              <span className="font-semibold">
                {metric.value}
              </span>

            </div>

          ))}

        </div>

      </Card>

    </div>
  );
}