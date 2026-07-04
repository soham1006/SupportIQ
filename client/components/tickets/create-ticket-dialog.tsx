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

import { Textarea } from '@/components/ui/textarea';


import { Plus } from 'lucide-react';

import { useCreateTicket } from '@/features/tickets/use-create-ticket';

export function CreateTicketDialog() {
  const [open, setOpen] =
    useState(false);

  const [subject, setSubject] =
    useState('');

  const [
    description,
    setDescription,
  ] = useState('');

  const [priority, setPriority] =
    useState<
      'LOW' | 'MEDIUM' | 'HIGH'
    >('MEDIUM');

  const createTicket =
    useCreateTicket();

  async function handleSubmit() {
    if (
      !subject.trim() ||
      !description.trim()
    ) {
      return;
    }

    await createTicket.mutateAsync({
      subject,
      description,
      priority,
    });

    setSubject('');

    setDescription('');

    setPriority('MEDIUM');

    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>

        <Button className="rounded-xl">

          <Plus size={18} />

          Create Ticket

        </Button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <DialogTitle>
            Create Ticket
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          <Input
            placeholder="Subject"
            value={subject}
            onChange={e =>
              setSubject(
                e.target.value,
              )
            }
          />

          <Textarea
            rows={6}
            placeholder="Describe the issue..."
            value={description}
            onChange={e =>
              setDescription(
                e.target.value,
              )
            }
          />

         <div className="space-y-2">

  <label className="text-sm font-medium">
    Priority
  </label>

  <select
    value={priority}
    onChange={e =>
      setPriority(
        e.target.value as
          | 'LOW'
          | 'MEDIUM'
          | 'HIGH',
      )
    }
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
  >
    <option value="LOW">
      Low
    </option>

    <option value="MEDIUM">
      Medium
    </option>

    <option value="HIGH">
      High
    </option>
  </select>

</div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={
              createTicket.isPending
            }
          >
            {createTicket.isPending
              ? 'Creating...'
              : 'Create Ticket'}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}