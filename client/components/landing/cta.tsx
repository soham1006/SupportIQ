'use client';

import Link from 'next/link';

import {
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div
          className="
          relative

          overflow-hidden

          rounded-[2rem]

          border
          border-border

          bg-primary

          px-8
          py-20

          text-center

          text-primary-foreground

          shadow-2xl
          "
        >

          {/* Glow */}

          <div
            className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_top,rgba(255,255,255,.16),transparent_60%)]
            "
          />

          <div
            className="
            absolute

            -right-32
            -top-32

            h-80
            w-80

            rounded-full

            bg-white/10

            blur-3xl
            "
          />

          <div className="relative">

            {/* Badge */}

            <div
              className="
              mb-8

              inline-flex

              items-center
              gap-2

              rounded-full

              border
              border-white/20

              bg-white/10

              px-5
              py-2.5
              "
            >

              <Sparkles size={15} />

              <span className="text-sm font-medium">
                AI Customer Support Platform
              </span>

            </div>

            {/* Heading */}

            <h2
              className="
              mx-auto

              max-w-4xl

              text-4xl

              font-semibold

              leading-tight

              tracking-tight

              md:text-6xl
              "
            >

              Ready to transform your customer support?

            </h2>

            {/* Description */}

            <p
              className="
              mx-auto

              mt-6

              max-w-3xl

              text-lg

              leading-8

              text-primary-foreground/80
              "
            >

              Upload your knowledge base, answer customer questions instantly,
              and seamlessly hand complex conversations to your support team.

            </p>

            {/* Buttons */}

            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

              <Button
                asChild
                variant="secondary"
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
                className="
                  border-white/25

                  bg-transparent

                  text-white

                  hover:bg-white/10
                  hover:text-white
                "
              >

                <Link href="/login">
                  Login
                </Link>

              </Button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}