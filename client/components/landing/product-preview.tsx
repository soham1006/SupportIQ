'use client';

import {
  Bot,
  BarChart3,
  Database,
  Ticket,
  Users,
  LayoutDashboard,
} from 'lucide-react';

const pages = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    description:
      'Overview of tickets, AI usage and system health.',
  },
  {
    title: 'AI Assistant',
    icon: Bot,
    description:
      'Ask questions using your knowledge base.',
  },
  {
    title: 'Knowledge Base',
    icon: Database,
    description:
      'Upload and manage company documents.',
  },
  {
    title: 'Tickets',
    icon: Ticket,
    description:
      'Track AI escalations and customer issues.',
  },
  {
    title: 'Agents',
    icon: Users,
    description:
      'Manage support agents and assignments.',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    description:
      'Monitor AI performance and support metrics.',
  },
];

export function ProductPreview() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold">
            Explore SupportIQ
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Everything your support team needs in one platform.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {pages.map(page => {
            const Icon = page.icon;

            return (
              <div
                key={page.title}
                className="overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Fake Screenshot */}

                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-emerald-500/10 via-background to-background">

                  <Icon
                    size={70}
                    className="text-emerald-500"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-xl font-semibold">

                    {page.title}

                  </h3>

                  <p className="mt-3 text-muted-foreground">

                    {page.description}

                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}