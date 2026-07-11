'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

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
        .map((skill) => skill.trim())
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

      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <DialogTitle>

            Create Agent

          </DialogTitle>

          <DialogDescription>

            Invite a new support agent and assign their primary skills.

          </DialogDescription>

        </DialogHeader>

        <div className="space-y-5">

          <div className="space-y-2">

            <Label>

              Full Name

            </Label>

            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          <div className="space-y-2">

            <Label>

              Email Address

            </Label>

            <Input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="space-y-2">

            <Label>

              Password

            </Label>

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <div className="space-y-2">

            <Label>

              Skills

            </Label>

            <Input
              placeholder="React, Node.js, PostgreSQL"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
            />

            <p className="text-xs text-muted-foreground">

              Separate multiple skills with commas.

            </p>

          </div>

        </div>

        <DialogFooter showCloseButton>

          <Button
            onClick={handleSubmit}
            disabled={createAgent.isPending}
          >
            {createAgent.isPending
              ? 'Creating...'
              : 'Create Agent'}
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  );
}