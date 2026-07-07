'use client';

import Link from 'next/link';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';

export function CustomerDashboard() {
  return (
    <DashboardLayout>

      <PageContainer>

        <PageHeader
          title="Welcome back 👋"
          description="Manage conversations, AI support, knowledge base and tickets."
        />

        <p className="mb-8 text-muted-foreground">
          How can SupportIQ help you today?
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {/* AI Assistant */}

          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            <h2 className="mb-2 text-xl font-semibold">
              AI Assistant
            </h2>

            <p className="mb-6 text-sm text-muted-foreground">
              Ask questions about your uploaded documents and receive AI-powered answers.
            </p>

            <Link
              href="/chat"
              className="inline-flex rounded-lg bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
            >
              Start Chat
            </Link>

          </div>

          {/* Knowledge Base */}

          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            <h2 className="mb-2 text-xl font-semibold">
              Knowledge Base
            </h2>

            <p className="mb-6 text-sm text-muted-foreground">
              Upload PDFs and manage your organizations knowledge base.
            </p>

            <Link
              href="/knowledge"
              className="inline-flex rounded-lg bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
            >
              Manage Documents
            </Link>

          </div>

          {/* Tickets */}

          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            <h2 className="mb-2 text-xl font-semibold">
              My Tickets
            </h2>

            <p className="mb-6 text-sm text-muted-foreground">
              View the status of your support requests and AI escalations.
            </p>

            <Link
              href="/tickets"
              className="inline-flex rounded-lg bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
            >
              View Tickets
            </Link>

          </div>

        </div>

      </PageContainer>

    </DashboardLayout>
  );
}