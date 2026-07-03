'use client';

import {
  Bell,
  Menu,
  Search,
} from 'lucide-react';

import { Input } from '@/components/ui/input';

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">

      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="flex items-center gap-3">

          {/* Mobile Menu */}

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted lg:hidden">

            <Menu size={20} />

          </button>

          <div>

            <h1 className="text-2xl font-semibold tracking-tight">
              Dashboard
            </h1>

            <p className="hidden text-sm text-muted-foreground sm:block">
              AI Customer Support Platform
            </p>

          </div>

        </div>

        {/* Center */}

        <div className="hidden w-full max-w-md px-8 lg:block">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Search..."
              className="pl-11"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Search (mobile) */}

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted lg:hidden">

            <Search size={18} />

          </button>

          {/* Notification */}

          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted">

            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />

          </button>

          {/* User */}

          <button className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 transition hover:bg-muted">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white">

              S

            </div>

            <div className="hidden text-left xl:block">

              <p className="text-sm font-medium">
                Soham
              </p>

              <p className="text-xs text-muted-foreground">
                Admin
              </p>

            </div>

          </button>

        </div>

      </div>

    </header>
  );
}