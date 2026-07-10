'use client';

import {
  Activity,
  TrendingUp,
} from 'lucide-react';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

import { useDashboardStats } from '@/features/dashboard/use-dashboard-stats';

const CHART_COLOR = '#78716c'; // stone-500 (Ink Wash)

export function TicketChart() {
  const { data, isLoading } =
    useDashboardStats();

  if (isLoading) {
    return (
      <Card>

        <CardContent className="space-y-6 p-8">

          <Skeleton className="h-10 w-64" />

          <Skeleton className="h-[320px] rounded-2xl" />

        </CardContent>

      </Card>
    );
  }

  const chartData = [
    {
      label: 'Open',
      tickets: data?.data.openTickets ?? 0,
    },
    {
      label: 'In Progress',
      tickets:
        data?.data.inProgressTickets ?? 0,
    },
    {
      label: 'Resolved',
      tickets:
        data?.data.resolvedTickets ?? 0,
    },
    {
      label: 'Closed',
      tickets:
        data?.data.closedTickets ?? 0,
    },
  ];

  return (
    <Card>

      <CardContent className="p-8">

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              border
              border-border

              bg-muted
              "
            >

              <Activity
                size={20}
                className="text-primary"
              />

            </div>

            <div>

              <h2 className="text-2xl font-semibold tracking-tight">

                Ticket Status

              </h2>

              <p className="text-sm text-muted-foreground">

                Current ticket distribution

              </p>

            </div>

          </div>

          <Badge>

            <TrendingUp size={14} />

            {data?.data.totalTickets ?? 0} Tickets

          </Badge>

        </div>

        <ResponsiveContainer
          width="100%"
          height={340}
        >

          <AreaChart data={chartData}>

            <defs>

              <linearGradient
                id="ticketGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor={CHART_COLOR}
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor={CHART_COLOR}
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E7E5E4"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: '#78716C',
                fontSize: 12,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: '#78716C',
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                stroke: CHART_COLOR,
                strokeWidth: 1,
              }}
              contentStyle={{
                background: '#FFFFFF',
                border: '1px solid #E7E5E4',
                borderRadius: '16px',
                color: '#1C1917',
                boxShadow:
                  '0 8px 30px rgba(0,0,0,.08)',
              }}
            />

            <Area
              type="monotone"
              dataKey="tickets"
              stroke={CHART_COLOR}
              strokeWidth={3}
              fill="url(#ticketGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
}