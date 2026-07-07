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
      'Upload PDFs, manuals and company knowledge.',
  },
  {
    icon: Brain,
    title: 'AI Indexes Everything',
    description:
      'SupportIQ builds a searchable vector knowledge base.',
  },
  {
    icon: MessageSquare,
    title: 'Customer Asks',
    description:
      'Customers chat naturally with the AI assistant.',
  },
  {
    icon: Ticket,
    title: 'Low Confidence?',
    description:
      'SupportIQ automatically creates a support ticket.',
  },
  {
    icon: Users,
    title: 'Assign Best Agent',
    description:
      'The most suitable agent receives the ticket instantly.',
  },
];

export function Workflow() {
  return (
    <section
      id="workflow"
      className="bg-muted/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold">

            How SupportIQ Works

          </h2>

          <p className="mt-4 text-lg text-muted-foreground">

            AI handles repetitive questions while your team focuses on complex issues.

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border bg-card p-6 text-center shadow-sm"
              >

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">

                  <Icon
                    size={30}
                    className="text-emerald-500"
                  />

                </div>

                <h3 className="text-lg font-semibold">

                  {step.title}

                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">

                  {step.description}

                </p>

                {index !==
                  steps.length - 1 && (
                  <div className="absolute right-[-22px] top-1/2 hidden -translate-y-1/2 text-3xl text-emerald-500 xl:block">

                    →

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}