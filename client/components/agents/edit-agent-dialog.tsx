'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useUpdateAgent } from '@/features/agents/use-update-agent';

interface Props {
  agent: {
    id: string;
    name: string;
    skills: string[];
    isActive: boolean;
  };
}

export function EditAgentDialog({
  agent,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState(agent.name);

  const [skills, setSkills] =
    useState(
      agent.skills.join(', '),
    );

  const [isActive, setIsActive] =
    useState(agent.isActive);

  const updateAgent =
    useUpdateAgent();


  async function handleSave() {
    await updateAgent.mutateAsync({
      id: agent.id,

      data: {
        name,

        isActive,

        skills: skills
          .split(',')
          .map(skill =>
            skill.trim(),
          )
          .filter(Boolean),
      },
    });

    setOpen(false);
  }

  return (
   <Dialog
  open={open}
  onOpenChange={value => {
    if (value) {
      setName(agent.name);
      setSkills(agent.skills.join(', '));
      setIsActive(agent.isActive);
    }

    setOpen(value);
  }}
>
      <DialogTrigger asChild>

        <Button variant="outline">
          Edit Agent
        </Button>

      </DialogTrigger>

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

          <Input
            value={skills}
            onChange={e =>
              setSkills(
                e.target.value,
              )
            }
            placeholder="React, Node.js..."
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
            onClick={handleSave}
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