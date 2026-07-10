'use client';

import Link from 'next/link';

import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-2xl

                border
                border-border

                bg-card
                "
              >

                <Sparkles
                  size={18}
                  className="text-primary"
                />

              </div>

              <div>

                <h2 className="text-lg font-semibold tracking-tight">

                  SupportIQ

                </h2>

                <p className="text-xs text-muted-foreground">

                  AI Customer Support

                </p>

              </div>

            </div>

            <p className="mt-5 max-w-sm leading-7 text-muted-foreground">

              An AI-native customer support platform that combines
              knowledge retrieval, intelligent conversations,
              and human agents in one calm workspace.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider">

              Product

            </h3>

            <div className="space-y-3">

              <a
                href="#features"
                className="block text-sm text-muted-foreground transition hover:text-foreground"
              >
                Features
              </a>

              <a
                href="#workflow"
                className="block text-sm text-muted-foreground transition hover:text-foreground"
              >
                Workflow
              </a>

              <a
                href="#faq"
                className="block text-sm text-muted-foreground transition hover:text-foreground"
              >
                FAQ
              </a>

            </div>

          </div>

          {/* Account */}

          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider">

              Account

            </h3>

            <div className="space-y-3">

              <Link
                href="/login"
                className="block text-sm text-muted-foreground transition hover:text-foreground"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="block text-sm text-muted-foreground transition hover:text-foreground"
              >
                Register
              </Link>

            </div>

          </div>

          {/* Developer */}

          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider">

              Developer

            </h3>

            <div className="space-y-3">

              <a
                href="https://github.com/soham1006"
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-muted-foreground transition hover:text-foreground"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/soham-mewada-0b3342285/"
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-muted-foreground transition hover:text-foreground"
              >
                LinkedIn
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div
          className="
          mt-16

          flex
          flex-col

          gap-4

          border-t
          border-border

          pt-8

          text-sm
          text-muted-foreground

          md:flex-row
          md:items-center
          md:justify-between
          "
        >

          <p>

            © 2026 SupportIQ. All rights reserved.

          </p>

          <p>

            Built with Next.js, Express, PostgreSQL & Gemini AI.

          </p>

        </div>

      </div>

    </footer>
  );
}