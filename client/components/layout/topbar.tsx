'use client';

import {
  Menu,
  Search,
} from 'lucide-react';

import { NotificationBell } from './notification-bell';
import { useSidebar } from './sidebar-context';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { UserMenu } from './user-menu';

export function Topbar() {
  const { setOpen } =
    useSidebar();
  const pathname = usePathname();

  const pageTitles: Record<
  string,
  string
> = {
  '/dashboard/admin':
    'Dashboard',

  '/chat':
    'AI Assistant',

  '/tickets':
    'Tickets',

  '/knowledge':
    'Knowledge Base',

  '/agents':
    'Agents',

  '/analytics':
    'Analytics',

  '/settings':
    'Settings',
};

const title =
  pageTitles[pathname] ??
  'SupportIQ';

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">

      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}

        <div className="flex items-center gap-3">

          {/* Mobile Menu */}

          <button
            onClick={() =>
              setOpen(true)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted lg:hidden"
          >

            <Menu size={20} />

          </button>

          <div>

            <h1 className="text-2xl font-semibold tracking-tight">
              {title}
            </h1>

            <p className="hidden text-sm text-muted-foreground sm:block">
             Manage your customer support platform
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

          {/* Mobile Search */}

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted lg:hidden">

            <Search size={18} />

          </button>

          <NotificationBell />

         <UserMenu />

        </div>

      </div>

    </header>
  );
}