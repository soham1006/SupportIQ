'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does SupportIQ answer customer questions?',
    answer:
      'SupportIQ uses Retrieval-Augmented Generation (RAG). Company documents are converted into vector embeddings, the most relevant content is retrieved from the knowledge base, and Gemini generates responses grounded in that information.',
  },
  {
    question: 'What file types are supported?',
    answer:
      'SupportIQ currently supports PDF documents. Files are parsed, chunked, embedded and indexed automatically for semantic search.',
  },
  {
    question: 'What happens if the AI is unsure?',
    answer:
      'When the confidence score falls below the configured threshold, SupportIQ automatically creates a support ticket and routes it to the appropriate support agent.',
  },
  {
    question: 'Can multiple organizations use SupportIQ?',
    answer:
      'Yes. SupportIQ is built as a multi-tenant platform where every organization has isolated users, documents, tickets and AI knowledge.',
  },
  {
    question: 'Which technologies power SupportIQ?',
    answer:
      'SupportIQ is built with Next.js, Express, PostgreSQL, Prisma, ChromaDB, Gemini AI, Tailwind CSS and TypeScript.',
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-28"
    >
      <div className="mx-auto max-w-4xl px-6">

        {/* Heading */}

        <div className="mb-20 text-center">

          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Answers to common questions about SupportIQ and how it works.
          </p>

        </div>

        {/* FAQ */}

        <div
          className="
          rounded-3xl
          border
          border-border
          bg-card
          p-2
          shadow-sm
          "
        >

          <Accordion
            type="single"
            collapsible
            className="w-full"
          >

            {faqs.map((faq, index) => (

              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-border px-5"
              >

                <AccordionTrigger className="py-6 text-left text-base font-medium">

                  {faq.question}

                </AccordionTrigger>

                <AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">

                  {faq.answer}

                </AccordionContent>

              </AccordionItem>

            ))}

          </Accordion>

        </div>

      </div>

    </section>
  );
}