'use client';

import {
  ArrowRight,
  Mail,
  Ticket,
  User,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Agent } from '@/features/agents/types';

interface Props {
  agent: Agent;
}

export function AgentCard({
  agent,
}: Props) {
  const router = useRouter();

  const online = agent.isActive;

  return (
    <Card
      className="
        group
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <CardContent className="relative p-7">

        {/* Glow */}

        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative">

          {/* Header */}

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">

                <User
                  size={26}
                  className="text-primary"
                />

              </div>

              <div>

                <h3 className="text-lg font-semibold">

                  {agent.name}

                </h3>

                <p className="text-sm text-muted-foreground">

                  Support Agent

                </p>

              </div>

            </div>

            <Badge
              variant={
                online
                  ? 'success'
                  : 'secondary'
              }
            >
              {online ? 'Online' : 'Offline'}
            </Badge>

          </div>

          {/* Email */}

          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">

            <Mail size={16} />

            <span className="truncate">

              {agent.email}

            </span>

          </div>

          {/* Skills */}

          <div className="mt-7">

            <p className="mb-3 text-sm font-medium text-muted-foreground">

              Skills

            </p>

            <div className="flex flex-wrap gap-2">

              {agent.skills.length ? (
                agent.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">

                  No skills added

                </span>
              )}

            </div>

          </div>

          {/* Stats */}

          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-border bg-muted/40 p-5">

              <div className="flex items-center gap-2 text-muted-foreground">

                <Ticket size={16} />

                Assigned

              </div>

              <h4 className="mt-3 text-3xl font-semibold">

                {agent._count.assignedTickets}

              </h4>

            </div>

            <div className="rounded-2xl border border-border bg-muted/40 p-5">

              <p className="text-muted-foreground">

                Availability

              </p>

              <h4 className="mt-3 text-xl font-semibold">

                {online
                  ? 'Available'
                  : 'Offline'}

              </h4>

            </div>

          </div>

          {/* Footer */}

          <Button
            className="mt-8 w-full"
            variant="outline"
            onClick={() =>
              router.push(`/agents/${agent.id}`)
            }
          >
            View Profile

            <ArrowRight size={16} />

          </Button>

        </div>

      </CardContent>
    </Card>
  );
}