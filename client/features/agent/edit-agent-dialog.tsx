'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Agent } from './agent.types';
import { useUpdateAgent } from './use-update-agent';
import { SkillsSelector } from '../../components/agent/skills-selector';

import { toast } from 'sonner';

interface Props {
  agent: Agent | null;
  open: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
}

export function EditAgentDialog({
  agent,
  open,
  onOpenChange,
}: Props) {
  const updateAgent =
    useUpdateAgent();

 const [name, setName] = useState(
  agent?.name ?? '',
);

const [skills, setSkills] = useState<string[]>(
  agent?.skills ?? [],
);

const [isActive, setIsActive] = useState(
  agent?.isActive ?? true,
);

  async function save() {
    if (!agent) return;

    try {
      await updateAgent.mutateAsync({
        id: agent.id,
        data: {
          name,
          skills,
          isActive,
        },
      });

      toast.success(
        'Agent updated',
      );

      onOpenChange(false);

    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ??
          'Update failed',
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Edit Agent
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Input
            value={name}
            onChange={e =>
              setName(
                e.target.value,
              )
            }
          />

          <SkillsSelector
            value={skills}
            onChange={setSkills}
          />

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={isActive}
              onChange={e =>
                setIsActive(
                  e.target.checked,
                )
              }
            />

            Active

          </label>

          <Button
            className="w-full"
            onClick={save}
            disabled={
              updateAgent.isPending
            }
          >
            {updateAgent.isPending
              ? 'Saving...'
              : 'Save Changes'}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}