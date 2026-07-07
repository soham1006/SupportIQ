'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-8 py-16 text-center text-white shadow-2xl">

          {/* Background Glow */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]" />

          <div className="relative">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">

              <Sparkles size={16} />

              AI Customer Support Platform

            </div>

            <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-5xl">

              Ready to Experience
              <br />
              AI-Powered Customer Support?

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-emerald-50">

              Upload your companys knowledge base, answer customer
              questions instantly with AI, and automatically escalate
              complex issues to your support team.

            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-emerald-700 transition hover:scale-105 hover:bg-emerald-50"
              >

                Get Started

                <ArrowRight size={18} />

              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >

                Login

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}