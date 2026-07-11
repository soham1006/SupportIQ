'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
          .map((skill) =>
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
      onOpenChange={(value) => {
        if (value) {
          setName(agent.name);
          setSkills(
            agent.skills.join(', '),
          );
          setIsActive(
            agent.isActive,
          );
        }

        setOpen(value);
      }}
    >
      <DialogTrigger asChild>

        <Button variant="outline">

          Edit Agent

        </Button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <DialogTitle>

            Edit Agent

          </DialogTitle>

          <DialogDescription>

            Update the agents information, skills and availability.

          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5">

          <div className="space-y-2">

            <Label>

              Full Name

            </Label>

            <Input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value,
                )
              }
            />

          </div>

          <div className="space-y-2">

            <Label>

              Skills

            </Label>

            <Input
              value={skills}
              placeholder="React, Node.js, PostgreSQL"
              onChange={(e) =>
                setSkills(
                  e.target.value,
                )
              }
            />

            <p className="text-xs text-muted-foreground">

              Separate multiple skills with commas.

            </p>

          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">

            <div>

              <p className="font-medium">

                Active Status

              </p>

              <p className="text-sm text-muted-foreground">

                Allow this agent to receive new tickets.

              </p>

            </div>

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(
                  e.target.checked,
                )
              }
              className="h-4 w-4 accent-primary"
            />

          </div>

        </div>

        <DialogFooter showCloseButton>

          <Button
            onClick={handleSave}
            disabled={
              updateAgent.isPending
            }
          >
            {updateAgent.isPending
              ? 'Saving...'
              : 'Save Changes'}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
}