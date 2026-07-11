'use client';

import {
  Brain,
  CheckCircle,
  Clock3,
  TrendingUp,
} from 'lucide-react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { useOverview } from '@/features/analytics/use-overview';

export function PerformanceMetrics() {
  const {
    data,
    isLoading,
  } = useOverview();

  if (isLoading) {
    return (
      <div className="grid gap-8 xl:grid-cols-2">

        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="h-80 animate-pulse" />
          </Card>
        ))}

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
      icon: Clock3,
    },
    {
      label: 'Closed Tickets',
      value: data?.data.closedTickets ?? 0,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid gap-8 xl:grid-cols-2">

      {/* AI */}

      <Card>

        <CardContent className="p-8">

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">

              <Brain
                size={22}
                className="text-primary"
              />

            </div>

            <div>

              <h2 className="text-2xl font-semibold">

                AI Performance

              </h2>

              <p className="text-sm text-muted-foreground">

                Model quality & automation metrics

              </p>

            </div>

          </div>

          <div className="space-y-5">

            {aiMetrics.map((metric) => (

              <div
                key={metric.label}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-border
                  bg-background
                  px-5
                  py-5
                "
              >

                <span className="text-muted-foreground">

                  {metric.label}

                </span>

                <span className="text-2xl font-semibold text-primary">

                  {metric.value}

                </span>

              </div>

            ))}

          </div>

        </CardContent>

      </Card>

      {/* Tickets */}

      <Card>

        <CardContent className="p-8">

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">

              <TrendingUp
                size={22}
                className="text-primary"
              />

            </div>

            <div>

              <h2 className="text-2xl font-semibold">

                Ticket Overview

              </h2>

              <p className="text-sm text-muted-foreground">

                Current support workload

              </p>

            </div>

          </div>

          <div className="space-y-5">

            {ticketMetrics.map((metric) => {

              const Icon = metric.icon;

              return (

                <div
                  key={metric.label}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-border
                    bg-background
                    px-5
                    py-5
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-primary/10 p-2">

                      <Icon
                        size={16}
                        className="text-primary"
                      />

                    </div>

                    <span className="text-muted-foreground">

                      {metric.label}

                    </span>

                  </div>

                  <span className="text-2xl font-semibold">

                    {metric.value}

                  </span>

                </div>

              );

            })}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}