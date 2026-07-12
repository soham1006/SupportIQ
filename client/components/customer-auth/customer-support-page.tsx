'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowLeft,
  Loader2,
  MessageSquare,
} from 'lucide-react';

import {
  useWorkspace,
} from '@/features/customer-auth/use-workspace';

import {
  CustomerRegisterForm,
} from './customer-register-form';

interface Props {
  slug: string;
}

export function CustomerSupportPage({
  slug,
}: Props) {
  const {
    data,
    isLoading,
    isError,
  } = useWorkspace(slug);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={28}
            className="animate-spin text-primary"
          />

          <p className="text-sm text-muted-foreground">
            Loading support workspace...
          </p>
        </div>
      </main>
    );
  }

  if (
    isError ||
    !data?.data
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border bg-card">
            <MessageSquare
              size={24}
              className="text-muted-foreground"
            />
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Workspace not found
          </h1>

          <p className="mt-3 leading-7 text-muted-foreground">
            This support workspace does not exist or the link is invalid.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft
              size={16}
            />

            Back to SupportIQ
          </Link>
        </div>
      </main>
    );
  }

  const workspace =
    data.data;

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Workspace information */}

        <section className="relative hidden overflow-hidden border-r border-border bg-muted/40 p-16 lg:flex lg:flex-col lg:justify-center">
          {/* Ink Wash background */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,113,108,0.16),transparent_42%)]" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative max-w-xl">
            <div className="flex items-center gap-4">
              <Image
                src="/brand/supportiq-icon.png"
                alt="SupportIQ"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
                priority
              />

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Support portal
                </p>

                <h1 className="text-3xl font-semibold tracking-tight">
                  {workspace.name}
                </h1>
              </div>
            </div>

            <h2 className="mt-12 max-w-lg text-5xl font-semibold leading-tight tracking-tight">
              Get the help you need,
              <span className="mt-2 block text-primary">
                powered by AI.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
              Create your customer account to ask questions, receive answers
              from the company knowledge base, and track support requests.
            </p>

            <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
              <MessageSquare
                size={18}
                className="text-primary"
              />

              AI support with human escalation when needed
            </div>
          </div>
        </section>

        {/* Registration */}

        <section className="flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md">
            {/* Mobile branding */}

            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <Image
                src="/brand/supportiq-icon.png"
                alt="SupportIQ"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
                priority
              />

              <div>
                <p className="text-xs text-muted-foreground">
                  Support portal
                </p>

                <h1 className="font-semibold">
                  {workspace.name}
                </h1>
              </div>
            </div>

            <CustomerRegisterForm
              workspaceName={
                workspace.name
              }
              workspaceSlug={
                workspace.slug
              }
            />

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Powered by SupportIQ
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}