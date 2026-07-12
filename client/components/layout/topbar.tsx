'use client';

import {
  Menu,
  Search,
  X,
} from 'lucide-react';

import {
  FormEvent,
  useState,
} from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { Input } from '@/components/ui/input';

import { NotificationBell } from './notification-bell';
import { UserMenu } from './user-menu';
import { useSidebar } from './sidebar-context';

import { useAuth } from '@/features/auth/use-auth';

interface SearchItem {
  label: string;
  description: string;
  href: string;
  roles: Array<
    'ADMIN' | 'AGENT' | 'CUSTOMER'
  >;
}

const searchItems: SearchItem[] = [
  {
    label: 'AI Assistant',
    description:
      'Ask questions using the knowledge base',
    href: '/chat',
    roles: [
      'ADMIN',
      'AGENT',
      'CUSTOMER',
    ],
  },
  {
    label: 'Tickets',
    description:
      'View and manage support tickets',
    href: '/tickets',
    roles: [
      'ADMIN',
      'AGENT',
      'CUSTOMER',
    ],
  },
  {
    label: 'Knowledge Base',
    description:
      'Manage uploaded documents',
    href: '/knowledge',
    roles: ['ADMIN'],
  },
  {
    label: 'Agents',
    description:
      'Manage support agents',
    href: '/agents',
    roles: ['ADMIN'],
  },
  {
    label: 'Customers',
    description:
      'View customer accounts',
    href: '/customers',
    roles: ['ADMIN'],
  },
  {
    label: 'Analytics',
    description:
      'View support performance',
    href: '/analytics',
    roles: [
      'ADMIN',
      'AGENT',
    ],
  },
  {
    label: 'Profile',
    description:
      'Manage your account',
    href: '/profile',
    roles: [
      'ADMIN',
      'AGENT',
      'CUSTOMER',
    ],
  },
  {
    label: 'Settings',
    description:
      'Manage workspace settings',
    href: '/settings',
    roles: ['ADMIN'],
  },
];

export function Topbar() {
  const { setOpen } =
    useSidebar();

  const { user } =
    useAuth();

  const pathname =
    usePathname();

  const router =
    useRouter();

  const [query, setQuery] =
    useState('');

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const pageTitles: Record<
    string,
    string
  > = {
    '/dashboard/admin':
      'Dashboard',

    '/dashboard/agent':
      'Dashboard',

    '/dashboard/customer':
      'Dashboard',

    '/chat':
      'AI Assistant',

    '/tickets':
      'Tickets',

    '/knowledge':
      'Knowledge Base',

    '/agents':
      'Agents',

    '/customers':
      'Customers',

    '/analytics':
      'Analytics',

    '/profile':
      'Profile',

    '/settings':
      'Settings',
  };

  const title =
    pageTitles[pathname] ??
    'SupportIQ';

  const normalizedQuery =
    query.trim().toLowerCase();

  const availableItems =
    searchItems.filter(item =>
      user
        ? item.roles.includes(
            user.role,
          )
        : false,
    );

  const results =
    normalizedQuery.length === 0
      ? []
      : availableItems
          .filter(item => {
            const searchableText =
              `${item.label} ${item.description}`
                .toLowerCase();

            return searchableText.includes(
              normalizedQuery,
            );
          })
          .slice(0, 6);

  function navigateTo(
    href: string,
  ) {
    setQuery('');
    setSearchOpen(false);

    router.push(href);
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (results.length > 0) {
      navigateTo(
        results[0].href,
      );
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/75 supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="mx-auto flex h-18 items-center justify-between px-6 lg:px-8">
        {/* Left */}

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() =>
              setOpen(true)
            }
            className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary/20 hover:bg-accent lg:hidden"
          >
            <Menu
              size={20}
              className="text-muted-foreground group-hover:text-primary"
            />
          </button>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {title}
            </h1>

            <p className="hidden text-sm text-muted-foreground sm:block">
              Manage your customer
              support platform
            </p>
          </div>
        </div>

        {/* Desktop Search */}

        <div className="hidden w-full max-w-md px-8 lg:block">
          <div className="relative">
            <form
              onSubmit={
                handleSubmit
              }
            >
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                value={query}
                onChange={event =>
                  setQuery(
                    event.target
                      .value,
                  )
                }
                onFocus={() =>
                  setSearchOpen(
                    true,
                  )
                }
                placeholder="Search SupportIQ..."
                className="pl-11"
              />
            </form>

            {/* Desktop Results */}

            {searchOpen &&
              normalizedQuery && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-lg">
                  {results.length >
                  0 ? (
                    <div className="space-y-1">
                      {results.map(
                        item => (
                          <button
                            key={
                              item.href
                            }
                            type="button"
                            onClick={() =>
                              navigateTo(
                                item.href,
                              )
                            }
                            className="w-full rounded-xl px-4 py-3 text-left transition-colors hover:bg-accent"
                          >
                            <p className="text-sm font-medium">
                              {
                                item.label
                              }
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {
                                item.description
                              }
                            </p>
                          </button>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                      No results
                      found.
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open search"
            onClick={() =>
              setSearchOpen(
                true,
              )
            }
            className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary/20 hover:bg-accent lg:hidden"
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

      {/* Mobile Search */}

      {searchOpen && (
        <div className="border-t border-border bg-background p-4 lg:hidden">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              autoFocus
              value={query}
              onChange={event =>
                setQuery(
                  event.target.value,
                )
              }
              placeholder="Search SupportIQ..."
              className="pl-11 pr-12"
            />

            <button
              type="button"
              aria-label="Close search"
              onClick={() => {
                setSearchOpen(
                  false,
                );

                setQuery('');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X size={18} />
            </button>
          </div>

          {normalizedQuery && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card p-2">
              {results.length >
              0 ? (
                <div className="space-y-1">
                  {results.map(
                    item => (
                      <button
                        key={
                          item.href
                        }
                        type="button"
                        onClick={() =>
                          navigateTo(
                            item.href,
                          )
                        }
                        className="w-full rounded-xl px-4 py-3 text-left transition-colors hover:bg-accent"
                      >
                        <p className="text-sm font-medium">
                          {
                            item.label
                          }
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {
                            item.description
                          }
                        </p>
                      </button>
                    ),
                  )}
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}