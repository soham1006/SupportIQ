'use client';

import {
  Bot,
  CheckCircle2,
  FileText,
  Ticket,
  UserCheck,
} from 'lucide-react';

import { Card } from '@/components/ui/card';

const activities = [
  {
    id: 1,
    icon: Bot,
    title: 'AI resolved a login issue',
    description:
      'Confidence score reached 97%',
    time: '2 min ago',
  },
  {
    id: 2,
    icon: Ticket,
    title: 'Ticket #143 assigned',
    description:
      'Assigned to Rahul Sharma',
    time: '15 min ago',
  },
  {
    id: 3,
    icon: FileText,
    title: 'Knowledge Base updated',
    description:
      'Employee Handbook indexed',
    time: '1 hour ago',
  },
  {
    id: 4,
    icon: UserCheck,
    title: 'Agent became available',
    description:
      'Priya Patel is now online',
    time: 'Today',
  },
  {
    id: 5,
    icon: CheckCircle2,
    title: 'Ticket resolved',
    description:
      'Refund request marked as resolved',
    time: 'Today',
  },
];

export function RecentActivity() {
  return (
    <Card className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest updates across your workspace.
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {activities.map(activity => {

          const Icon = activity.icon;

          return (

            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-xl p-3 transition hover:bg-muted/40"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">

                <Icon
                  size={20}
                  className="text-primary"
                />

              </div>

              <div className="flex-1">

                <p className="font-medium">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.description}
                </p>

              </div>

              <span className="text-xs whitespace-nowrap text-muted-foreground">
                {activity.time}
              </span>

            </div>

          );
        })}

      </div>

    </Card>
  );
}