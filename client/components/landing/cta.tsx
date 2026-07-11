'use client';

import Link from 'next/link';

import Image from 'next/image';

import {
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useAuth } from '@/features/auth/use-auth';

export function CTA() {
  const { user } = useAuth();

  const dashboardHref =
    user?.role === 'ADMIN'
      ? '/dashboard/admin'
      : user?.role === 'AGENT'
        ? '/dashboard/agent'
        : '/dashboard/customer';

  return (
    <section className="py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-primary px-8 py-20 text-center text-primary-foreground shadow-2xl">

          {/* Glow */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.16),transparent_60%)]" />

          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">

            {/* Badge */}

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5">

              <Image
  src="/brand/supportiq-icon.png"
  alt=""
  width={18}
  height={18}
  className="h-[50px] w-[50px] object-contain"
/>

              <span className="text-sm font-medium">
                AI Customer Support Platform
              </span>

            </div>

            {/* Heading */}

            <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">

              Ready to transform your customer support?

            </h2>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-primary-foreground/80">

              Upload your knowledge base, answer customer questions instantly,
              and seamlessly hand complex conversations to your support team.

            </p>

            {/* Actions */}

            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

              {user ? (

                <Button
                  asChild
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90"
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
                    className="bg-white text-stone-900 hover:bg-stone-100 hover:text-stone-900"
                  >
                    <Link href="/register">

                      Get Started

                      <ArrowRight size={18} />

                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="border border-black/40 bg-transparent text-black shadow-none hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/login">
                      Login
                    </Link>
                  </Button>

                </>
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}