'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

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
    <div className="rounded-2xl border border-border bg-card p-6">

      <div className="flex justify-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">

          <User
            size={40}
            className="text-primary"
          />

        </div>

      </div>

      <div className="mt-6 space-y-5">

        <div>

          <p className="text-sm text-muted-foreground">
            Name
          </p>

          <p className="font-semibold">
            {agent.name}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Email
          </p>

          <p className="font-semibold">
            {agent.email}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <p className="font-semibold">
            {agent.isActive
              ? 'Active'
              : 'Inactive'}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Skills
          </p>

          <div className="mt-2 flex flex-wrap gap-2">

            {agent.skills.length > 0 ? (
              agent.skills.map(
                (
                  skill: string,
                ) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {skill}
                  </span>
                ),
              )
            ) : (
              <span className="text-sm text-muted-foreground">
                No skills
              </span>
            )}

          </div>

        </div>

       <div className="mt-8 flex gap-3">

  <div className="flex-1">
    <EditAgentDialog
      agent={agent}
    />
  </div>

  <Button
  variant={
    agent.isActive
      ? 'destructive'
      : 'default'
  }
  className="flex-1"
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

      </div>

    </div>
  );
}