'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { useUpdateAgent } from '@/features/agents/use-update-agent';

import { EditAgentDialog } from './edit-agent-dialog';

interface Props {
  agent: any;
}

export function AgentInfoCard({
  agent,
}: Props) {
  const router = useRouter();

  const updateAgent =
    useUpdateAgent();

  async function handleToggleStatus() {
    const action =
      agent.isActive
        ? 'deactivate'
        : 'activate';

    const confirmed =
      window.confirm(
        `Are you sure you want to ${action} this agent?`,
      );

    if (!confirmed) {
      return;
    }

    await updateAgent.mutateAsync({
      id: agent.id,
      data: {
        isActive:
          !agent.isActive,
      },
    });

    router.refresh();
  }

  return (
    <Card>

      <CardContent className="p-7">

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">

            <User
              size={42}
              className="text-primary"
            />

          </div>

          <h2 className="mt-5 text-2xl font-semibold">

            {agent.name}

          </h2>

          <p className="mt-1 text-sm text-muted-foreground">

            {agent.email}

          </p>

          <Badge
            className="mt-4"
            variant={
              agent.isActive
                ? 'success'
                : 'secondary'
            }
          >
            {agent.isActive
              ? 'Active'
              : 'Inactive'}
          </Badge>

        </div>

        {/* Details */}

        <div className="mt-8 space-y-6">

          <div>

            <p className="text-sm font-medium text-muted-foreground">

              Skills

            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              {agent.skills.length ? (
                agent.skills.map(
                  (skill: string) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                    >
                      {skill}
                    </Badge>
                  ),
                )
              ) : (
                <span className="text-sm text-muted-foreground">

                  No skills added

                </span>
              )}

            </div>

          </div>

          <div className="rounded-2xl border border-border bg-muted/40 p-5">

            <div className="flex items-center justify-between">

              <span className="text-muted-foreground">

                Assigned Tickets

              </span>

              <span className="text-2xl font-semibold">

                {agent._count?.assignedTickets ?? 0}

              </span>

            </div>

          </div>

        </div>

        {/* Actions */}

        <div className="mt-8 flex gap-3">

          <div className="flex-1">

            <EditAgentDialog
              agent={agent}
            />

          </div>

          <Button
            className="flex-1"
            variant={
              agent.isActive
                ? 'destructive'
                : 'default'
            }
            onClick={
              handleToggleStatus
            }
            disabled={
              updateAgent.isPending
            }
          >
            {updateAgent.isPending
              ? 'Saving...'
              : agent.isActive
              ? 'Deactivate'
              : 'Activate'}
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}