'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { useCreateAgent } from '@/features/agents/use-create-agent';

export function CreateAgentDialog() {
  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [skills, setSkills] =
    useState('');

  const createAgent =
    useCreateAgent();

  async function handleSubmit() {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return;
    }

    await createAgent.mutateAsync({
      name,
      email,
      password,
      skills: skills
        .split(',')
        .map(skill =>
          skill.trim(),
        )
        .filter(Boolean),
    });

    setName('');
    setEmail('');
    setPassword('');
    setSkills('');

    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>

        <Button>

          <Plus size={18} />

          Add Agent

        </Button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>
            Create Agent
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Full Name"
            value={name}
            onChange={e =>
              setName(
                e.target.value,
              )
            }
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e =>
              setEmail(
                e.target.value,
              )
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e =>
              setPassword(
                e.target.value,
              )
            }
          />

          <Input
            placeholder="Skills (React, Node.js, SQL)"
            value={skills}
            onChange={e =>
              setSkills(
                e.target.value,
              )
            }
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={
              createAgent.isPending
            }
          >
            {createAgent.isPending
              ? 'Creating...'
              : 'Create Agent'}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}