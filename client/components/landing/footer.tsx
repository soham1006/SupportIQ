'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-4">

          <div>

            <h2 className="text-2xl font-bold">

              SupportIQ

            </h2>

            <p className="mt-3 text-sm text-muted-foreground">

              AI-powered customer support platform built with modern web technologies.

            </p>

          </div>

          <div>

            <h3 className="mb-4 font-semibold">

              Product

            </h3>

            <div className="space-y-3 text-sm">

              <a
                href="#features"
                className="block text-muted-foreground hover:text-foreground"
              >
                Features
              </a>

              <a
                href="#workflow"
                className="block text-muted-foreground hover:text-foreground"
              >
                Workflow
              </a>

              <a
                href="#faq"
                className="block text-muted-foreground hover:text-foreground"
              >
                FAQ
              </a>

            </div>

          </div>

          <div>

            <h3 className="mb-4 font-semibold">

              Account

            </h3>

            <div className="space-y-3 text-sm">

              <Link
                href="/login"
                className="block text-muted-foreground hover:text-foreground"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="block text-muted-foreground hover:text-foreground"
              >
                Register
              </Link>

            </div>

          </div>

          <div>

            <h3 className="mb-4 font-semibold">

              Developer

            </h3>

            <div className="space-y-3 text-sm">

              <a
                href="https://github.com/soham1006"
                target="_blank"
                className="block text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/soham-mewada-0b3342285/"
                target="_blank"
                className="block text-muted-foreground hover:text-foreground"
              >
                LinkedIn
              </a>

            </div>

          </div>

        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">

          © 2026 SupportIQ. Built with ❤️ using Next.js, Express, PostgreSQL & Gemini AI.

        </div>

      </div>

    </footer>
  );
}