'use client';

import {
  ArrowLeft,
  Clock3,
  User,
} from 'lucide-react';

import { useRouter, useParams } from 'next/navigation';
import { AssignAgent } from './assign-agent';

import { useAgents } from '@/features/agents/use-agents';

import { useAssignTicket } from '@/features/tickets/use-assign-ticket';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useTicket } from '@/features/tickets/use-ticket';
import { useState } from 'react';

import { ReplyComposer } from './reply-composer';

import { useCreateReply } from '@/features/tickets/use-create-reply';

import { useAIReply } from '@/features/tickets/use-ai-reply';

import { StatusSelector } from './status-selector';

import { useUpdateTicketStatus } from '@/features/tickets/use-update-ticket-status';

export function TicketDetailsPage() {

const router = useRouter();

const params = useParams();

const ticketId = params.id as string;

const [reply, setReply] = useState('');

const createReply = useCreateReply();

const aiReply = useAIReply();

const { data: agentsData } =
  useAgents();

const assignTicket =
  useAssignTicket();

 async function handleReply() {
  if (!reply.trim()) return;

  await createReply.mutateAsync({
    ticketId,
    message: reply,
  });

  setReply('');
}

async function handleGenerate() {
  const response =
    await aiReply.mutateAsync(
      ticketId,
    );

  setReply(
    response.data.draft,
  );
}

  const { data, isLoading } =
    useTicket(ticketId);

  const ticket = data?.data;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          Loading ticket...
        </div>
      </DashboardLayout>
    );
  }

  const updateStatus =
  useUpdateTicketStatus();

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <Button
              variant="ghost"
              className="mb-4"
              onClick={() =>
                router.push('/tickets')
              }
            >
              <ArrowLeft size={18} />
              Back to Tickets
            </Button>

            <h1 className="text-3xl font-bold">
              {ticket?.subject ??
                'Unable to login'}
            </h1>

            <p className="mt-2 text-muted-foreground">
              Ticket #{ticketId}
            </p>

          </div>

          <div className="flex gap-3">

            <Badge variant="warning">
              {ticket?.status ?? 'OPEN'}
            </Badge>

            <Badge variant="destructive">
              {ticket?.priority ??
                'HIGH'}
            </Badge>

          </div>

        </div>

        {/* Main */}

        <div className="grid gap-6 xl:grid-cols-[1fr_350px]">

          {/* Left */}

          <div className="space-y-6">

            {/* Conversation */}


<div className="rounded-2xl border border-border bg-card p-6">

  <h2 className="mb-6 text-xl font-semibold">
    Conversation
  </h2>

  {/* Original Ticket */}

  <div className="mb-6 rounded-2xl bg-muted p-5">

    <p className="mb-2 font-semibold">
      {ticket.customer.name}
    </p>

    <p className="leading-7 text-muted-foreground">
      {ticket.description}
    </p>

  </div>

  {/* Replies */}

  <div className="space-y-5">

    {ticket.replies.length === 0 ? (

      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">

        No replies yet.

      </div>

    ) : (

      ticket.replies.map((reply) => (

        <div
          key={reply.id}
          className="rounded-2xl border border-border p-5"
        >

          <div className="mb-3 flex items-center justify-between">

            <div>

              <p className="font-semibold">
                {reply.user.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {reply.user.role}
              </p>

            </div>

            <span className="text-xs text-muted-foreground">

              {new Date(
                reply.createdAt,
              ).toLocaleString()}

            </span>

          </div>

          <p className="leading-7">
            {reply.message}
          </p>

        </div>

      ))

    )}

  </div>

</div>
</div>
          {/* Right Sidebar */}

          <div className="space-y-6">

            {/* Customer */}

            <div className="rounded-2xl border border-border bg-card p-6">

              <h2 className="mb-5 text-lg font-semibold">
                Customer
              </h2>

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">

                  <User
                    size={22}
                    className="text-primary"
                  />

                </div>

                <div>

                  <p className="font-medium">
                    {ticket?.customer
                      ?.name ??
                      'John Doe'}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {ticket?.customer
                      ?.email ??
                      'john@example.com'}
                  </p>

                </div>

              </div>

            </div>

            {/* Customer */}

<div className="rounded-2xl ...">

...

</div>

{/* Assign Agent */}

<AssignAgent
  agents={
    agentsData?.data ?? []
  }
  selected={
    ticket?.assignedAgent?.id
  }
  loading={
    assignTicket.isPending
  }
  onAssign={agentId =>
    assignTicket.mutate({
      ticketId,
      agentId,
    })
  }
/>

            {/* Ticket Info */}

            <div className="rounded-2xl border border-border bg-card p-6">

              <h2 className="mb-5 text-lg font-semibold">
                Ticket Details
              </h2>

              <div className="space-y-5">

               <StatusSelector
  value={ticket.status}
  loading={updateStatus.isPending}
  onChange={status =>
    updateStatus.mutate({
      ticketId,
      status,
    })
  }
/>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Priority
                  </span>

                  <Badge variant="destructive">
                    {ticket?.priority ??
                      'HIGH'}
                  </Badge>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Assigned
                  </span>

                  <span>
                    {ticket?.assignedAgent
                      ?.name ??
                      'Unassigned'}
                  </span>

                </div>

              </div>

            </div>

            <ReplyComposer
  value={reply}
  onChange={setReply}
  onSend={handleReply}
  onGenerate={handleGenerate}
  loading={createReply.isPending}
  generating={aiReply.isPending}
/>

            {/* Timeline */}

            <div className="rounded-2xl border border-border bg-card p-6">

              <h2 className="mb-5 text-lg font-semibold">
                Timeline
              </h2>

              <div className="space-y-5">

                <div className="flex gap-3">

                  <Clock3
                    size={18}
                    className="mt-1 text-primary"
                  />

                  <div>

                    <p className="font-medium">
                      Ticket Created
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {ticket?.createdAt ??
                        'Today'}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <Clock3
                    size={18}
                    className="mt-1 text-primary"
                  />

                  <div>

                    <p className="font-medium">
                      AI Responded
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Waiting...
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}