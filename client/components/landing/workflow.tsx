'use client';

import {
  Upload,
  Brain,
  MessageSquare,
  Ticket,
  Users,
} from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Documents',
    description:
      'Import PDFs, manuals and company knowledge into SupportIQ.',
  },
  {
    icon: Brain,
    title: 'AI Builds Knowledge',
    description:
      'Documents are indexed into a searchable vector knowledge base.',
  },
  {
    icon: MessageSquare,
    title: 'Customers Ask',
    description:
      'Customers chat naturally with the AI assistant.',
  },
  {
    icon: Ticket,
    title: 'Automatic Escalation',
    description:
      'Low-confidence conversations become support tickets.',
  },
  {
    icon: Users,
    title: 'Agent Resolution',
    description:
      'The right support agent receives and resolves the request.',
  },
];

export function Workflow() {
  return (
    <section
      id="workflow"
      className="py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            How SupportIQ Works
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            AI resolves repetitive questions automatically while your support
            team focuses on conversations that truly need a human.
          </p>

        </div>

        {/* Timeline */}

        <div className="grid gap-8 lg:grid-cols-5">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={step.title}
                className="relative"
              >

                {/* Connector */}

                {index !== steps.length - 1 && (

                  <div
                    className="
                    absolute

                    left-[calc(50%+2rem)]
                    top-8

                    hidden

                    h-px
                    w-full

                    bg-border

                    lg:block
                    "
                  />

                )}

                <div
                  className="
                  relative

                  h-full

                  rounded-3xl

                  border
                  border-border

                  bg-card

                  p-7

                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:shadow-lg
                  "
                >

                  {/* Step */}

                  <div className="mb-6 flex items-center justify-between">

                    <div
                      className="
                      flex

                      h-14
                      w-14

                      items-center
                      justify-center

                      rounded-2xl

                      bg-primary/10
                      "
                    >

                      <Icon
                        size={24}
                        className="text-primary"
                      />

                    </div>

                    <span
                      className="
                      text-sm

                      font-semibold

                      text-muted-foreground
                      "
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  </div>

                  <h3 className="text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {step.description}
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