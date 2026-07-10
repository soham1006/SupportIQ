'use client';

import {
  BarChart3,
  Bell,
  Brain,
  Ticket,
  Upload,
  Users,
} from 'lucide-react';

const features = [
  {
    title: 'Knowledge Base',
    description:
      'Upload PDFs, manuals and documentation to build an AI-ready knowledge base.',
    icon: Upload,
  },
  {
    title: 'AI Assistant',
    description:
      'Answer customer questions instantly using Retrieval-Augmented Generation.',
    icon: Brain,
  },
  {
    title: 'Smart Escalation',
    description:
      'Automatically create tickets whenever AI confidence falls below your threshold.',
    icon: Ticket,
  },
  {
    title: 'Agent Workspace',
    description:
      'Assign conversations to the right support agent with complete context.',
    icon: Users,
  },
  {
    title: 'Analytics',
    description:
      'Track ticket trends, AI performance and customer support metrics.',
    icon: BarChart3,
  },
  {
    title: 'Real-time Notifications',
    description:
      'Keep agents informed instantly whenever something important happens.',
    icon: Bell,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Everything You Need
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            SupportIQ combines AI, automation and human collaboration into one
            calm workspace for modern customer support teams.
          </p>

        </div>

        {/* Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <article
                key={feature.title}
                className="
                  group

                  rounded-3xl

                  border
                  border-border

                  bg-card

                  p-8

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-primary/20
                  hover:shadow-xl
                "
              >

                {/* Icon */}

                <div
                  className="
                  mb-8

                  flex
                  h-14
                  w-14

                  items-center
                  justify-center

                  rounded-2xl

                  bg-primary/10

                  transition-colors
                  duration-300

                  group-hover:bg-primary/15
                  "
                >

                  <Icon
                    size={24}
                    className="text-primary"
                  />

                </div>

                {/* Title */}

                <h3 className="text-xl font-semibold tracking-tight">

                  {feature.title}

                </h3>

                {/* Description */}

                <p className="mt-4 leading-7 text-muted-foreground">

                  {feature.description}

                </p>

              </article>

            );

          })}

        </div>

      </div>

    </section>
  );
}