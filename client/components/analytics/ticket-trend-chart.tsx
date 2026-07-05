'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card } from '@/components/ui/card';

import { useTicketTrend } from '@/features/analytics/use-ticket-trend';

export function TicketTrendChart() {
  const {
    data,
    isLoading,
  } = useTicketTrend();

  if (isLoading) {
    return (
      <Card className="flex h-[400px] items-center justify-center">
        Loading...
      </Card>
    );
  }

  const chartData =
    data?.data.map(item => ({
      date: new Date(
        item.date,
      ).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
        },
      ),

      tickets: item.count,
    })) ?? [];

  return (
    <Card className="p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Ticket Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <AreaChart
          data={chartData}
        >

          <defs>

            <linearGradient
              id="tickets"
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
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="tickets"
            stroke="#22c55e"
            strokeWidth={3}
            fill="url(#tickets)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </Card>
  );
}