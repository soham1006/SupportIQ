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

import { useTicketTrend } from '@/features/analytics/use-ticket-trend';

export function TicketTrendChart() {
  const {
    data,
    isLoading,
  } = useTicketTrend();

  if (isLoading) {
    return (
      <Card>

        <CardContent className="flex h-[420px] items-center justify-center text-muted-foreground">

          Loading chart...

        </CardContent>

      </Card>
    );
  }

  const chartData =
    data?.data.map((item) => ({
      date: new Date(item.date).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
        },
      ),
      tickets: item.count,
    })) ?? [];

  const totalTickets = chartData.reduce(
    (sum, item) => sum + item.tickets,
    0,
  );

  return (
    <Card>

      <CardContent className="p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <div className="mb-3 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">

                <Activity
                  size={20}
                  className="text-primary"
                />

              </div>

              <div>

                <h2 className="text-2xl font-semibold">

                  Ticket Trend

                </h2>

                <p className="text-sm text-muted-foreground">

                  Daily ticket volume

                </p>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2">

            <TrendingUp
              size={16}
              className="text-primary"
            />

            <span className="text-sm font-medium">

              {totalTickets}

            </span>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={340}
        >

          <AreaChart data={chartData}>

            <defs>

              <linearGradient
                id="ticketTrend"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: 'var(--muted-foreground)',
                fontSize: 12,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: 'var(--muted-foreground)',
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                stroke: 'var(--primary)',
                strokeWidth: 1,
              }}
              contentStyle={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                color: 'var(--foreground)',
              }}
            />

            <Area
              type="monotone"
              dataKey="tickets"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#ticketTrend)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
}