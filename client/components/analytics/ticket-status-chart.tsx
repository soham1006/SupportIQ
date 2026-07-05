'use client';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Card } from '@/components/ui/card';

import { useTicketStatus } from '@/features/analytics/use-ticket-status';

const COLORS = [
  '#22c55e',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
];

export function TicketStatusChart() {
  const {
    data,
    isLoading,
  } = useTicketStatus();

  if (isLoading) {
    return (
      <Card className="flex h-[480px] items-center justify-center">
        Loading...
      </Card>
    );
  }

  const chartData =
    data?.data.map(item => ({
      name: item.status
        .replace('_', ' '),
      value: item.count,
    })) ?? [];

  return (
    <Card className="p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Ticket Status Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
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

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

      <div className="mt-6 space-y-3">

        {chartData.map(
          (item, index) => (

            <div
              key={item.name}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index],
                  }}
                />

                <span className="text-sm">
                  {item.name}
                </span>

              </div>

              <span className="font-medium">
                {item.value}
              </span>

            </div>

          ),
        )}

      </div>

    </Card>
  );
}