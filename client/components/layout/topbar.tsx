'use client';

import {
  Menu,
  Search,
} from 'lucide-react';

import { usePathname } from 'next/navigation';

import { Input } from '@/components/ui/input';

import { NotificationBell } from './notification-bell';
import { UserMenu } from './user-menu';
import { useSidebar } from './sidebar-context';

export function Topbar() {
  const { setOpen } = useSidebar();

  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    '/dashboard/admin': 'Dashboard',
    '/dashboard/agent': 'Dashboard',
    '/dashboard/customer': 'Dashboard',

    '/chat': 'AI Assistant',
    '/tickets': 'Tickets',
    '/knowledge': 'Knowledge Base',
    '/agents': 'Agents',
    '/customers': 'Customers',
    '/analytics': 'Analytics',
    '/settings': 'Settings',
  };

  const title =
    pageTitles[pathname] ??
    'SupportIQ';

  return (
    <header
      className="
      sticky
      top-0
      z-30

      border-b
      border-border/80

      bg-background/75

      supports-[backdrop-filter]:backdrop-blur-xl
      "
    >
      <div
        className="
        mx-auto

        flex
        h-18

        items-center
        justify-between

        px-6

        lg:px-8
        "
      >

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setOpen(true)
            }
            className="
              group

              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-2xl

              border
              border-border

              bg-card

              transition-all
              duration-200

              hover:border-primary/20
              hover:bg-accent

              lg:hidden
            "
          >

            <Menu
              size={20}
              className="text-muted-foreground group-hover:text-primary"
            />

          </button>

          <div>

            <h1
              className="
              text-2xl

              font-semibold

              tracking-tight
            "
            >
              {title}
            </h1>

            <p className="hidden text-sm text-muted-foreground sm:block">
              Manage your customer support platform
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="hidden w-full max-w-md px-8 lg:block">

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2

                -translate-y-1/2

                text-muted-foreground
              "
            />

            <Input
              placeholder="Search tickets, customers, agents..."
              className="pl-11"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            className="
              group

              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-2xl

              border
              border-border

              bg-card

              transition-all
              duration-200

              hover:border-primary/20
              hover:bg-accent

              lg:hidden
            "
          >

            <Search
              size={18}
              className="text-muted-foreground group-hover:text-primary"
            />

          </button>

          <NotificationBell />

          <UserMenu />

        </div>

      </div>

    </header>
  );
}