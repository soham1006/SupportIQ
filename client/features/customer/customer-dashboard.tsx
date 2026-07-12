'use client';

import Link from 'next/link';

import {
  ArrowRight,
  MessageSquare,
  Ticket,
} from 'lucide-react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';

import { Button } from '@/components/ui/button';

import { useAuth } from '@/features/auth/use-auth';

export function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader
          title={`Welcome back, ${user?.name ?? 'Customer'} `}
          description="Get AI-powered answers and manage your support requests."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {/* AI Assistant */}

          <div className="rounded-2xl border bg-card p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <MessageSquare
                size={22}
                className="text-primary"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              AI Assistant
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Ask questions and get answers based on your organization&apos;s
              knowledge base.
            </p>

            <Button
              asChild
              className="mt-6 gap-2"
            >
              <Link href="/chat">
                Start Chat

                <ArrowRight
                  size={17}
                />
              </Link>
            </Button>
          </div>

          {/* Tickets */}

          <div className="rounded-2xl border bg-card p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Ticket
                size={22}
                className="text-primary"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              My Tickets
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Track your support requests and follow the progress of issues
              escalated to the support team.
            </p>

            <Button
              asChild
              variant="outline"
              className="mt-6 gap-2"
            >
              <Link href="/tickets">
                View My Tickets

                <ArrowRight
                  size={17}
                />
              </Link>
            </Button>
          </div>
        </div>
      </PageContainer>
    </DashboardLayout>
  );
}