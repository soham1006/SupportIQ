'use client';

import {
  FileText,
  Ticket,
  Users,
  TrendingUp,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

import { useOverview } from '@/features/analytics/use-overview';

export function AnalyticsStats() {
  const { data, isLoading } =
    useOverview();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {Array.from({
          length: 4,
        }).map((_, index) => (
          <Card
            key={index}
            className="h-36 animate-pulse"
          />
        ))}

      </div>
    );
  }

  const stats = [
    {
      title: 'Total Tickets',
      value:
        data?.data.totalTickets ?? 0,
      icon: Ticket,
    },
    {
      title: 'Resolution Rate',
      value: `${
        data?.data
          .resolutionRate ?? 0
      }%`,
      icon: TrendingUp,
    },
    {
      title: 'Active Agents',
      value:
        data?.data.totalAgents ?? 0,
      icon: Users,
    },
    {
      title: 'Knowledge Documents',
      value:
        data?.data
          .totalDocuments ?? 0,
      icon: FileText,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map(stat => {

        const Icon =
          stat.icon;

        return (

          <Card
            key={stat.title}
            className="border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-center justify-between p-6">

              <div>

                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {stat.value}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">

                <Icon
                  className="text-primary"
                  size={24}
                />

              </div>

            </div>

          </Card>

        );
      })}

    </div>
  );
}