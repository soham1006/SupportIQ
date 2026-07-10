'use client';

import {
  Briefcase,
  CheckCircle2,
  Clock3,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useAgentWorkload } from '@/features/dashboard/use-agent-workload';

export function AgentWorkload() {
  const { data, isLoading } =
    useAgentWorkload();

  const router = useRouter();

  if (isLoading) {
    return (
      <Card className="space-y-5 p-8">

        <Skeleton className="h-8 w-52" />

        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className="h-36 rounded-2xl"
          />
        ))}

      </Card>
    );
  }

  return (
    <Card className="p-8">

      <div className="mb-8 flex items-end justify-between">

        <div>

          <h2 className="text-2xl font-semibold tracking-tight">
            Agent Workload
          </h2>

          <p className="mt-2 text-muted-foreground">
            Top 5 busiest support agents.
          </p>

        </div>

        <Button
          variant="outline"
          onClick={() =>
            router.push('/agents')
          }
        >
          View All
        </Button>

      </div>

      <div className="space-y-4">

        {data?.data.map((agent) => (

          <div
            key={agent.id}
            className="
              rounded-2xl

              border
              border-border

              bg-background/40

              p-6

              transition-all
              duration-200

              hover:border-primary/25
              hover:bg-accent/40
            "
          >

            <div className="mb-6 flex items-center gap-4">

              <Avatar size="lg">

                <AvatarFallback>

                  {agent.name?.charAt(0)?.toUpperCase() ?? 'A'}

                </AvatarFallback>

              </Avatar>

              <div className="min-w-0">

                <h3 className="truncate font-semibold">

                  {agent.name}

                </h3>

                <p className="truncate text-sm text-muted-foreground">

                  {agent.email}

                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

              <Stat
                icon={<Briefcase size={16} />}
                label="Total"
                value={agent.totalTickets}
              />

              <Stat
                icon={<Clock3 size={16} />}
                label="Open"
                value={agent.open}
              />

              <Stat
                icon={<Clock3 size={16} />}
                label="Progress"
                value={agent.inProgress}
              />

              <Stat
                icon={<CheckCircle2 size={16} />}
                label="Resolved"
                value={agent.resolved}
              />

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function Stat({
  icon,
  label,
  value,
}: StatProps) {
  return (
    <div
      className="
        rounded-xl

        border
        border-border/60

        bg-muted/30

        p-4
      "
    >

      <div className="flex items-center gap-2 text-sm text-muted-foreground">

        {icon}

        <span>{label}</span>

      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight">

        {value}

      </p>

    </div>
  );
}