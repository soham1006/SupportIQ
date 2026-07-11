'use client';

import {
  ArrowUpRight,
} from 'lucide-react';

import Image from 'next/image';

import { useAuth } from '@/features/auth/use-auth';

import { Button } from '@/components/ui/button';

export function DashboardHero() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 18
        ? 'Good Afternoon'
        : 'Good Evening';

  return (
    <section
      className="
      relative
      overflow-hidden

      rounded-3xl

      border
      border-border

      bg-card

      p-8

      shadow-sm

      lg:p-10
      "
    >
      {/* Ink Wash Background */}

      <div
        className="
        absolute
        inset-0

        bg-[radial-gradient(circle_at_top_right,rgba(120,113,108,0.10),transparent_35%)]
        "
      />

      <div
        className="
        absolute
        -right-24
        -top-24

        h-64
        w-64

        rounded-full

        bg-primary/10

        blur-3xl
        "
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="max-w-2xl">

          <div
            className="
            mb-6

            inline-flex
            items-center
            gap-2

            rounded-full

            border
            border-border

            bg-muted

            px-4
            py-2
            "
          >
            <Image
  src="/brand/supportiq-icon.png"
  alt=""
  width={50}
  height={50}
  className="h-[50px] w-[50px] object-contain"
/>

            <span className="text-sm font-medium text-muted-foreground">
              AI Customer Support Platform
            </span>
          </div>

          <h1
            className="
            text-3xl
            font-semibold
            tracking-tight
            text-foreground

            lg:text-5xl
            "
          >
            {greeting},{' '}
            <span className="text-primary">
              {user?.name ?? 'User'}
            </span>
          </h1>

          <p
            className="
            mt-5

            max-w-2xl

            text-base
            leading-8

            text-muted-foreground
            "
          >
            Monitor AI conversations, customer support tickets,
            knowledge base performance and agent productivity
            from one intelligent dashboard.
          </p>

        </div>

        {/* Right */}

        <div className="flex shrink-0">

          <Button
            size="lg"
            className="gap-2"
          >
            Open AI Assistant

            <ArrowUpRight size={18} />
          </Button>

        </div>

      </div>
    </section>
  );
}