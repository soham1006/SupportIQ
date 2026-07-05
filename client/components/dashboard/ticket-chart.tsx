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

import { useDashboardStats } from '@/features/dashboard/use-dashboard-stats';

export function TicketChart() {
  const { data, isLoading } =
    useDashboardStats();

  if (isLoading) {
    return (
      <Card>

        <CardContent className="flex h-[420px] items-center justify-center text-muted-foreground">

          Loading chart...

        </CardContent>

      </Card>
    );
  }

  const chartData = [
    {
      label: 'Open',
      tickets:
        data?.data.openTickets ?? 0,
    },
    {
      label: 'In Progress',
      tickets:
        data?.data
          .inProgressTickets ?? 0,
    },
    {
      label: 'Resolved',
      tickets:
        data?.data
          .resolvedTickets ?? 0,
    },
    {
      label: 'Closed',
      tickets:
        data?.data
          .closedTickets ?? 0,
    },
  ];

  return (
    <Card>

      <CardContent className="p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <div className="mb-3 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">

                <Activity
                  size={20}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Ticket Status
                </h2>

                <p className="text-sm text-slate-400">
                  Current ticket distribution
                </p>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

            <TrendingUp
              size={16}
              className="text-emerald-400"
            />

            <span className="text-sm font-medium text-emerald-300">

              {data?.data.totalTickets ?? 0}

            </span>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={340}
        >

          <AreaChart
            data={chartData}
          >

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
                  stopColor="#22c55e"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#243244"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              stroke="#94a3b8"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#94a3b8"
            />

            <Tooltip
              cursor={{
                stroke:
                  '#22c55e',
                strokeWidth: 1,
              }}
              contentStyle={{
                background:
                  '#111827',
                border:
                  '1px solid #25314A',
                borderRadius:
                  '16px',
                color: '#fff',
              }}
            />

            <Area
              type="monotone"
              dataKey="tickets"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#ticketGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
}