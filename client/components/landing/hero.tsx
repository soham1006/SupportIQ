'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_55%)]" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">

          <Sparkles size={16} />

          AI Powered Customer Support

        </div>

        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">

          Customer Support

          <span className="block text-emerald-500">

            Powered by AI

          </span>

        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">

          Upload your companys knowledge base and let AI answer customer
          questions instantly. When confidence is low, SupportIQ automatically
          creates tickets and routes them to the best support agent.

        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700"
          >

            Get Started

            <ArrowRight size={18} />

          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-4 text-lg transition hover:bg-muted"
          >

            Login

          </Link>

        </div>

      </div>

    </section>
  );
}