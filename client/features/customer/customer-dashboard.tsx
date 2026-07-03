'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/ui/page-container';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';

export function CustomerDashboard() {
  return (
    <DashboardLayout>
      <PageContainer>
        <div>
         <PageHeader
  title="Welcome back 👋"
  description="Manage conversations, AI support and tickets."
/>

          <p className="text-slate-500">
            How can SupportIQ help you today?
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="mb-2 text-xl font-semibold">
              AI Assistant
            </h2>

            <p className="mb-4 text-slate-500">
              Ask questions about your uploaded documents.
            </p>

            <Link
  href="/chat"
  className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
>
  Start Chat
</Link>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h2 className="mb-2 text-xl font-semibold">
              My Tickets
            </h2>

            <p className="text-slate-500">
              View your active support requests.
            </p>
          </div>
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}