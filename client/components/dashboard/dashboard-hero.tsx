'use client';

import {
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export function DashboardHero() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good Morning'
      : hour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#020617] p-8">

      {/* Background Glow */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative flex items-center justify-between">

        {/* Left */}

        <div className="max-w-2xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

            <Sparkles
              size={16}
              className="text-emerald-400"
            />

            <span className="text-sm font-medium text-emerald-300">
              AI Customer Support Platform
            </span>

          </div>

          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {greeting}, Soham 👋
          </h1>

          <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
            Monitor AI conversations,
            customer support tickets,
            knowledge base performance
            and agent productivity
            from one intelligent dashboard.
          </p>

        </div>

        {/* Right */}

        <div className="hidden lg:flex">

          <button className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:scale-105 hover:bg-emerald-600">

            Open AI Assistant

            <ArrowUpRight size={18} />

          </button>

        </div>

      </div>

    </section>
  );
}