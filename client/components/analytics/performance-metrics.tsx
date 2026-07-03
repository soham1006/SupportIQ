'use client';

import {
  Brain,
  Clock3,
  Star,
  TrendingUp,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

const aiMetrics = [
  {
    label: 'AI Accuracy',
    value: '94.2%',
  },
  {
    label: 'Avg Confidence',
    value: '91.7%',
  },
  {
    label: 'Escalation Rate',
    value: '6.1%',
  },
];

const responseMetrics = [
  {
    label: 'First Response',
    value: '38 sec',
  },
  {
    label: 'Resolution Time',
    value: '2h 14m',
  },
  {
    label: 'Customer Rating',
    value: '4.8 ★',
  },
];

export function PerformanceMetrics() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">

      {/* AI Performance */}

      <Card className="p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">

            <Brain
              size={22}
              className="text-primary"
            />

          </div>

          <div>

            <h2 className="text-xl font-semibold">
              AI Performance
            </h2>

            <p className="text-sm text-muted-foreground">
              Overall AI assistant quality
            </p>

          </div>

        </div>

        <div className="space-y-5">

          {aiMetrics.map(metric => (

            <div
              key={metric.label}
              className="flex items-center justify-between rounded-xl bg-muted/40 p-4"
            >

              <span className="text-muted-foreground">
                {metric.label}
              </span>

              <span className="font-semibold text-primary">
                {metric.value}
              </span>

            </div>

          ))}

        </div>

      </Card>

      {/* Response Metrics */}

      <Card className="p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">

            <TrendingUp
              size={22}
              className="text-primary"
            />

          </div>

          <div>

            <h2 className="text-xl font-semibold">
              Response Metrics
            </h2>

            <p className="text-sm text-muted-foreground">
              Customer support efficiency
            </p>

          </div>

        </div>

        <div className="space-y-5">

          {responseMetrics.map(metric => (

            <div
              key={metric.label}
              className="flex items-center justify-between rounded-xl bg-muted/40 p-4"
            >

              <div className="flex items-center gap-2">

                {metric.label ===
                'First Response' ? (
                  <Clock3
                    size={16}
                    className="text-primary"
                  />
                ) : metric.label ===
                  'Customer Rating' ? (
                  <Star
                    size={16}
                    className="text-primary"
                  />
                ) : (
                  <TrendingUp
                    size={16}
                    className="text-primary"
                  />
                )}

                <span className="text-muted-foreground">
                  {metric.label}
                </span>

              </div>

              <span className="font-semibold">
                {metric.value}
              </span>

            </div>

          ))}

        </div>

      </Card>

    </div>
  );
}