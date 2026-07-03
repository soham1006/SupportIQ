'use client';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Card } from '@/components/ui/card';

const data = [
  {
    name: 'Login',
    value: 35,
  },
  {
    name: 'Payments',
    value: 25,
  },
  {
    name: 'Orders',
    value: 18,
  },
  {
    name: 'Technical',
    value: 15,
  },
  {
    name: 'Others',
    value: 7,
  },
];

const COLORS = [
  '#22c55e',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
];

export function CategoryChart() {
  return (
    <Card className="p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Ticket Categories
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
          >

            {data.map((entry, index) => (

              <Cell
                key={entry.name}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

      <div className="mt-6 space-y-3">

        {data.map((item, index) => (

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
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </Card>
  );
}