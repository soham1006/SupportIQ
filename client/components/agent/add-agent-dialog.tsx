'use client';

import { useState } from 'react';

import {
  useForm,
  Controller,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  createAgentSchema,
  CreateAgentForm,
} from '@/features/agent/create-agent.schema';

import { useCreateAgent } from '@/features/agent/use-create-agent';

import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { SkillsSelector } from './skills-selector';

export function AddAgentDialog() {
  const [open, setOpen] =
    useState(false);

  const createAgent =
    useCreateAgent();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {
      errors,
    },
  } =
    useForm<CreateAgentForm>({
      resolver:
        zodResolver(
          createAgentSchema,
        ),

      defaultValues: {
        skills: [],
      },
    });

  async function onSubmit(
    data: CreateAgentForm,
  ) {
    try {
      await createAgent.mutateAsync(
        data,
      );

      toast.success(
        'Agent created successfully',
      );

      reset();

      setOpen(false);

    } catch (error: any) {

      toast.error(
        error.response?.data
          ?.message ??
          'Failed to create agent',
      );

    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button>
          + Add Agent
        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Create Agent
          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-4"
        >

          <Input
            placeholder="Name"
            {...register(
              'name',
            )}
          />

          <p className="text-sm text-red-500">
            {
              errors.name
                ?.message
            }
          </p>

          <Input
            placeholder="Email"
            {...register(
              'email',
            )}
          />

          <p className="text-sm text-red-500">
            {
              errors.email
                ?.message
            }
          </p>

          <Input
            type="password"
            placeholder="Password"
            {...register(
              'password',
            )}
          />

          <p className="text-sm text-red-500">
            {
              errors.password
                ?.message
            }
          </p>

          <Controller
  control={control}
  name="skills"
  render={({ field }) => (
    <SkillsSelector
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>

          <Button
            type="submit"
            className="w-full"
            disabled={
              createAgent.isPending
            }
          >
            {createAgent.isPending
              ? 'Creating...'
              : 'Create Agent'}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}