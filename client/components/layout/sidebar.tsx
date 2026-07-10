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

import { Sheet, SheetContent } from '@/components/ui/sheet';

import { NavItem } from './nav-item';
import { useSidebar } from './sidebar-context';
import { useAuth } from '@/features/auth/use-auth';

function SidebarContent() {
  const { user } = useAuth();

  return (
    <>
      {/* Header */}

      <div className="border-b border-sidebar-border px-6 py-6">

        <div className="flex items-center gap-4">

          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl

            border
            border-border

            bg-accent
            shadow-sm
          "
          >
            <Sparkles
              size={18}
              className="text-primary"
            />
          </div>

          <div>

            <h1 className="text-lg font-semibold tracking-tight text-sidebar-foreground">
              SupportIQ
            </h1>

            <p className="mt-0.5 text-xs text-muted-foreground">
              AI Customer Support
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

      {/* User */}

      <div className="border-t border-sidebar-border p-4">

        <button
          className="
          flex
          w-full
          items-center
          gap-3

          rounded-xl

          border
          border-transparent

          px-3
          py-3

          transition-all
          duration-200

          hover:border-border
          hover:bg-accent/60
        "
        >

          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            bg-primary

            text-sm
            font-semibold

            text-primary-foreground

            shadow-sm
          "
          >
            {(user?.name?.[0] ?? 'U').toUpperCase()}
          </div>

          <div className="min-w-0 flex-1 text-left">

            <p className="truncate text-sm font-medium text-foreground">
              {user?.name ?? 'User'}
            </p>

            <p className="text-xs text-muted-foreground">
              View profile
            </p>

          </div>

        </button>

      </div>
    </>
  );
}

export function Sidebar() {
  const {
    open,
    setOpen,
  } = useSidebar();

  return (
    <>
      {/* Desktop */}

      <aside
        className="
        hidden

        h-screen
        w-72
        shrink-0

        flex-col

        border-r
        border-sidebar-border

        bg-sidebar

        lg:flex
      "
      >
        <SidebarContent />
      </aside>

      {/* Mobile */}

      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetContent
          side="left"
          className="
          w-72
          border-r
          border-sidebar-border
          bg-sidebar
          p-0

          [&>button]:hidden
        "
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}