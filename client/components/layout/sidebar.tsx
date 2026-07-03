'use client';

import {
  LayoutDashboard,
  Ticket,
  MessageSquare,
  Upload,
  Users,
  Settings,
  Sparkles,
  BarChart3,
} from 'lucide-react';

import { NavItem } from './nav-item';

export function Sidebar() {
  return (
    <aside className="hidden lg:flex h-screen w-62 shrink-0 flex-col border-r border-border bg-sidebar">

      {/* Logo */}

      <div className="border-b border-border px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">

            <Sparkles
              size={18}
              className="text-emerald-400"
            />

          </div>

          <div>

            <h1 className="text-lg font-semibold tracking-tight">
              SupportIQ
            </h1>

            <p className="text-xs text-muted-foreground">
              AI Support Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-1 px-4 py-5">

        <NavItem
          href="/dashboard/admin"
          label="Dashboard"
          icon={LayoutDashboard}
        />

        <NavItem
          href="/chat"
          label="AI Assistant"
          icon={MessageSquare}
        />

        <NavItem
          href="/tickets"
          label="Tickets"
          icon={Ticket}
        />

        <NavItem
          href="/knowledge"
          label="Knowledge Base"
          icon={Upload}
        />

        <NavItem
          href="/agents"
          label="Agents"
          icon={Users}
        />

        <NavItem
  href="/analytics"
  label="Analytics"
  icon={BarChart3}
/>

        <NavItem
          href="/settings"
          label="Settings"
          icon={Settings}
        />

      </nav>

      {/* Bottom */}

      <div className="border-t border-border p-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-muted">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">

            S

          </div>

          <div className="flex-1 text-left">

            <p className="text-sm font-medium">
              Soham
            </p>

            <p className="text-xs text-muted-foreground">
              View Profile
            </p>

          </div>

        </button>

      </div>

    </aside>
  );
}