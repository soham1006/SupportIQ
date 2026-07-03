'use client';

import {
  Users,
  UserCheck,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

const stats = [
  {
    title: 'Total Agents',
    value: 8,
    icon: Users,
  },
  {
    title: 'Online',
    value: 6,
    icon: UserCheck,
  },
  {
    title: 'Busy',
    value: 3,
    icon: Briefcase,
  },
  {
    title: 'Resolved Today',
    value: 41,
    icon: CheckCircle2,
  },
];

export function AgentStats() {
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

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">

                <Icon
                  size={24}
                  className="text-primary"
                />

              </div>

            </div>

          </Card>

        );
      })}

    </div>
  );
}