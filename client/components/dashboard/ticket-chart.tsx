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

const data = [
  { day: 'Mon', tickets: 12 },
  { day: 'Tue', tickets: 18 },
  { day: 'Wed', tickets: 15 },
  { day: 'Thu', tickets: 26 },
  { day: 'Fri', tickets: 20 },
  { day: 'Sat', tickets: 16 },
  { day: 'Sun', tickets: 10 },
];

export function TicketChart() {
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
                  Ticket Activity
                </h2>

                <p className="text-sm text-slate-400">
                  Support requests over the last 7 days
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
              +18%
            </span>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={340}
        >
          <AreaChart data={data}>

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
              dataKey="day"
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
                stroke: '#22c55e',
                strokeWidth: 1,
              }}
              contentStyle={{
                background: '#111827',
                border: '1px solid #25314A',
                borderRadius: '16px',
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