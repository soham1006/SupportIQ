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

const data = [
  { month: 'Jan', tickets: 120 },
  { month: 'Feb', tickets: 180 },
  { month: 'Mar', tickets: 210 },
  { month: 'Apr', tickets: 260 },
  { month: 'May', tickets: 240 },
  { month: 'Jun', tickets: 320 },
];

export function TicketTrendChart() {
  return (
    <Card className="p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Ticket Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <AreaChart data={data}>

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

          <XAxis dataKey="month" />

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