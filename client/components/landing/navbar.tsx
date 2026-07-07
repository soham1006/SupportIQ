'use client';

import Link from 'next/link';

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          SupportIQ
        </Link>

        {/* Desktop Nav */}

        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#features"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#workflow"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Workflow
          </a>

          <a
            href="#faq"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            FAQ
          </a>

        </nav>

        {/* Actions */}

        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm transition hover:bg-muted"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Get Started
          </Link>

        </div>

      </div>

    </header>
  );
}