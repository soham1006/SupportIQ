'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
}: StatsCardProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10">
      <CardContent className="relative p-7">

        {/* Background Glow */}
        <div className="absolute -right-10 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
              {title}
            </p>

            <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-white">
              {value}
            </h2>

            <div className="mt-5 flex items-center gap-2">

              <ArrowUpRight
                size={16}
                className="text-emerald-400"
              />

              <span className="text-sm text-emerald-400">
                Updated just now
              </span>

            </div>

          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20">

            <Icon
              size={30}
              className="text-emerald-400"
            />

          </div>

        </div>

      </CardContent>
    </Card>
  );
}