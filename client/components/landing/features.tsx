'use client';

import {
  Brain,
  Upload,
  Ticket,
  Users,
  BarChart3,
  Bell,
} from 'lucide-react';

const features = [
  {
    title: 'Knowledge Base',
    description:
      'Upload PDFs and documents to build an intelligent knowledge base.',
    icon: Upload,
  },
  {
    title: 'AI Assistant',
    description:
      'Answer customer questions instantly using Retrieval-Augmented Generation.',
    icon: Brain,
  },
  {
    title: 'Smart Ticket Escalation',
    description:
      'Automatically create tickets whenever AI confidence is low.',
    icon: Ticket,
  },
  {
    title: 'Agent Management',
    description:
      'Assign tickets to the best available support agents.',
    icon: Users,
  },
  {
    title: 'Analytics',
    description:
      'Monitor ticket trends, AI performance and support metrics.',
    icon: BarChart3,
  },
  {
    title: 'Real-time Notifications',
    description:
      'Notify agents instantly whenever a new ticket is assigned.',
    icon: Bell,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold">

            Everything You Need

          </h2>

          <p className="mt-4 text-lg text-muted-foreground">

            SupportIQ combines AI, automation and human support into one modern platform.

          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {features.map(feature => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-8 transition hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl"
              >

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10">

                  <Icon
                    className="text-emerald-500"
                    size={26}
                  />

                </div>

                <h3 className="text-xl font-semibold">

                  {feature.title}

                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">

                  {feature.description}

                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}