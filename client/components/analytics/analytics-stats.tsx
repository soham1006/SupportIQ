'use client';

import {
  FileText,
  Ticket,
  TrendingUp,
  Users,
} from 'lucide-react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { useOverview } from '@/features/analytics/use-overview';

export function AnalyticsStats() {
  const {
    data,
    isLoading,
  } = useOverview();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="h-40 animate-pulse" />
          </Card>
        ))}

      </div>
    );
  }

  const stats = [
    {
      title: 'Total Tickets',
      value: data?.data.totalTickets ?? 0,
      icon: Ticket,
    },
    {
      title: 'Resolution Rate',
      value: `${data?.data.resolutionRate ?? 0}%`,
      icon: TrendingUp,
    },
    {
      title: 'Active Agents',
      value: data?.data.totalAgents ?? 0,
      icon: Users,
    },
    {
      title: 'Knowledge Docs',
      value: data?.data.totalDocuments ?? 0,
      icon: FileText,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {

        const Icon = stat.icon;

        return (

          <Card
            key={stat.title}
            className="
              group
              overflow-hidden
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <CardContent className="relative p-7">

              {/* Soft Glow */}

              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">

                    {stat.title}

                  </p>

                  <h2 className="mt-5 text-4xl font-semibold tracking-tight">

                    {stat.value}

                  </h2>

                </div>

                <div className="rounded-2xl bg-primary/10 p-4 transition-all duration-300 group-hover:scale-105">

                  <Icon
                    size={26}
                    className="text-primary"
                  />

                </div>

              </div>

            </CardContent>

          </Card>

        );

      })}

    </div>
  );
}