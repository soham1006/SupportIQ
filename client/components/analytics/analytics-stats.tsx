'use client';

import {
  Brain,
  Ticket,
  Clock3,
  TrendingUp,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

const stats = [
  {
    title: 'Total Tickets',
    value: '1,248',
    icon: Ticket,
    change: '+12%',
  },
  {
    title: 'AI Accuracy',
    value: '94%',
    icon: Brain,
    change: '+3%',
  },
  {
    title: 'Avg Response',
    value: '42 sec',
    icon: Clock3,
    change: '-18%',
  },
  {
    title: 'Resolution Rate',
    value: '91%',
    icon: TrendingUp,
    change: '+7%',
  },
];

export function AnalyticsStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map(stat => {

        const Icon = stat.icon;

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

                <p className="mt-2 text-sm font-medium text-emerald-500">
                  {stat.change} this month
                </p>

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