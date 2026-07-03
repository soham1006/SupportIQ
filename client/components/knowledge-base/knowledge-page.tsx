'use client';

import { Upload } from 'lucide-react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';

import { DocumentsTable } from './documents-table';

export function KnowledgePage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-3xl font-semibold">
              Knowledge Base
            </h1>

            <p className="mt-1 text-muted-foreground">
              Manage documents used by your AI assistant.
            </p>

          </div>

          <Button>

            <Upload size={18} />

            Upload Document

          </Button>

        </div>

        {/* Stats */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-border bg-card p-6">

            <p className="text-sm text-muted-foreground">
              Documents
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              0
            </h2>

          </div>

          <div className="rounded-2xl border border-border bg-card p-6">

            <p className="text-sm text-muted-foreground">
              Indexed
            </p>

            <h2 className="mt-3 text-3xl font-bold text-emerald-500">
              0
            </h2>

          </div>

          <div className="rounded-2xl border border-border bg-card p-6">

            <p className="text-sm text-muted-foreground">
              Processing
            </p>

            <h2 className="mt-3 text-3xl font-bold text-yellow-500">
              0
            </h2>

          </div>

          <div className="rounded-2xl border border-border bg-card p-6">

            <p className="text-sm text-muted-foreground">
              Total Chunks
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              0
            </h2>

          </div>

        </div>

        {/* Documents */}

        <div className="overflow-hidden rounded-2xl border border-border bg-card">

          <div className="border-b border-border px-6 py-5">

            <h2 className="font-semibold">
              Documents
            </h2>

          </div>

          <DocumentsTable />

        </div>

      </div>

    </DashboardLayout>
  );
}