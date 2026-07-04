'use client';

import { useState } from 'react';
import { CreateTicketDialog } from './create-ticket-dialog';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

import { TicketStats } from './ticket-stats';
import { TicketFilters } from './ticket-filters';
import { TicketsTable } from './tickets-table';

export function TicketsPage() {
  const [search, setSearch] =
    useState('');

  const [status, setStatus] =
    useState('ALL');

  const [priority, setPriority] =
    useState('ALL');

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-3xl font-semibold">
              Tickets
            </h1>

            <p className="mt-1 text-muted-foreground">
              Manage customer support tickets and AI escalations.
            </p>

          </div>

         <CreateTicketDialog />

        </div>

        {/* Stats */}

        <TicketStats />

        {/* Filters */}

        <TicketFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          priority={priority}
          onPriorityChange={setPriority}
        />

        {/* Table */}

        <div className="overflow-hidden rounded-2xl border border-border bg-card">

          <div className="flex items-center justify-between border-b border-border px-6 py-5">

            <div>

              <h2 className="font-semibold">
                Recent Tickets
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Latest customer support requests.
              </p>

            </div>

            <span className="text-sm text-muted-foreground">
              Live
            </span>

          </div>

          <TicketsTable
            search={search}
            status={status}
            priority={priority}
          />

        </div>

      </div>
    </DashboardLayout>
  );
}