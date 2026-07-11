'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useAuth } from '@/features/auth/use-auth';

export function Hero() {
  const { user } = useAuth();

  const dashboardHref =
    user?.role === 'ADMIN'
      ? '/dashboard/admin'
      : user?.role === 'AGENT'
        ? '/dashboard/agent'
        : '/dashboard/customer';

  return (
    <section className="relative overflow-hidden">
      {/* Ink Wash Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,113,108,.10),transparent_42%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,162,158,.05),transparent_45%)]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
          <Image
            src="/brand/supportiq-icon.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
            priority
          />

          <span className="text-sm font-medium text-muted-foreground">
            AI Powered Customer Support
          </span>
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
          Customer Support

          <span className="mt-2 block text-primary">
            Powered by Intelligence
          </span>
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
          Upload your company&apos;s knowledge base and let AI answer customer
          questions instantly. When confidence is low, SupportIQ automatically
          creates tickets and routes them to the right support agent.
        </p>

        {/* Actions */}

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          {user ? (
            <Button
              asChild
              size="lg"
            >
              <Link href={dashboardHref}>
                Go to Dashboard

                <ArrowRight size={18} />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                size="lg"
              >
                <Link href="/register">
                  Get Started

                  <ArrowRight size={18} />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
              >
                <Link href="/login">
                  Login
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Bottom Note */}

        <p className="mt-8 text-sm text-muted-foreground">
          Trusted AI workflows for modern support teams.
        </p>
      </div>
    </section>
  );
}