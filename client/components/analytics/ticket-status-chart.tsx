'use client';

import {
  Activity,
  PieChart as PieChartIcon,
} from 'lucide-react';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { useTicketStatus } from '@/features/analytics/use-ticket-status';

const COLORS = [
  '#78716c',
  '#a8a29e',
  '#d6d3d1',
  'var(--primary)',
];

export function TicketStatusChart() {
  const {
    data,
    isLoading,
  } = useTicketStatus();

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
      name: item.status.replace('_', ' '),
      value: item.count,
    })) ?? [];

  const total = chartData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <Card>

      <CardContent className="p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <div className="mb-3 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">

                <PieChartIcon
                  size={20}
                  className="text-primary"
                />

              </div>

              <div>

                <h2 className="text-2xl font-semibold">

                  Ticket Status

                </h2>

                <p className="text-sm text-muted-foreground">

                  Current distribution

                </p>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2">

            <Activity
              size={16}
              className="text-primary"
            />

            <span className="text-sm font-medium">

              {total}

            </span>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={78}
              outerRadius={110}
              paddingAngle={5}
            >

              {chartData.map(
                (entry, index) => (

                  <Cell
                    key={entry.name}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />

                ),
              )}

            </Pie>

            <Tooltip
              contentStyle={{
                background:
                  'var(--card)',
                border:
                  '1px solid var(--border)',
                borderRadius: 16,
                color:
                  'var(--foreground)',
              }}
            />

          </PieChart>

        </ResponsiveContainer>

        <div className="mt-8 space-y-4">

          {chartData.map(
            (item, index) => (

              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
              >

                <div className="flex items-center gap-3">

                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index],
                    }}
                  />

                  <span className="font-medium">

                    {item.name}

                  </span>

                </div>

                <span className="text-lg font-semibold">

                  {item.value}

                </span>

              </div>

            ),
          )}

        </div>

      </CardContent>

    </Card>
  );
}