'use client';

import {
  Bot,
  BarChart3,
  Database,
  LayoutDashboard,
  Ticket,
  Users,
} from 'lucide-react';

const pages = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview of tickets, AI usage and system health.',
  },
  {
    title: 'AI Assistant',
    icon: Bot,
    description: 'Ask questions using your knowledge base.',
  },
  {
    title: 'Knowledge Base',
    icon: Database,
    description: 'Upload and manage company documents.',
  },
  {
    title: 'Tickets',
    icon: Ticket,
    description: 'Track AI escalations and customer issues.',
  },
  {
    title: 'Agents',
    icon: Users,
    description: 'Manage support agents and assignments.',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    description: 'Monitor AI performance and support metrics.',
  },
];

export function ProductPreview() {
  return (
    <section className="py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Explore SupportIQ
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Every part of your customer support workflow in one calm,
            intelligent workspace.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {pages.map((page) => {

            const Icon = page.icon;

            return (

              <article
                key={page.title}
                className="
                  group

                  overflow-hidden

                  rounded-3xl

                  border
                  border-border

                  bg-card

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >

                {/* Fake App Window */}

                <div
                  className="
                    relative

                    h-60

                    border-b
                    border-border

                    bg-muted/30
                  "
                >

                  {/* Window Header */}

                  <div className="flex items-center gap-2 border-b border-border px-5 py-4">

                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />

                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />

                    <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />

                  </div>

                  {/* Fake UI */}

                  <div className="space-y-4 p-5">

                    <div className="flex items-center gap-3">

                      <div className="rounded-xl bg-primary/10 p-3">

                        <Icon
                          size={22}
                          className="text-primary"
                        />

                      </div>

                      <div className="space-y-2">

                        <div className="h-3 w-28 rounded-full bg-border" />

                        <div className="h-2 w-20 rounded-full bg-border/70" />

                      </div>

                    </div>

                    <div className="space-y-3">

                      <div className="h-3 rounded-full bg-border" />

                      <div className="h-3 w-5/6 rounded-full bg-border" />

                      <div className="h-3 w-4/6 rounded-full bg-border" />

                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">

                      <div className="h-14 rounded-xl bg-background border border-border" />

                      <div className="h-14 rounded-xl bg-background border border-border" />

                      <div className="h-14 rounded-xl bg-background border border-border" />

                    </div>

                  </div>

                </div>

                {/* Description */}

                <div className="p-7">

                  <h3 className="text-xl font-semibold tracking-tight">

                    {page.title}

                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">

                    {page.description}

                  </p>

                </div>

              </article>

            );

          })}

        </div>

      </div>

    </section>
  );
}