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
      'SupportIQ uses Retrieval-Augmented Generation (RAG). Documents are converted into vector embeddings, the most relevant information is retrieved from ChromaDB, and Gemini AI generates answers grounded in your knowledge base.',
  },
  {
    question: 'What file types are supported?',
    answer:
      'Currently SupportIQ supports PDF documents. Uploaded files are parsed, chunked, embedded and indexed for semantic search.',
  },
  {
    question: 'What happens if the AI is unsure?',
    answer:
      'SupportIQ calculates an AI confidence score. If confidence falls below the configured threshold, the conversation is automatically escalated into a support ticket and assigned to the best available agent.',
  },
  {
    question: 'Can multiple organizations use SupportIQ?',
    answer:
      'Yes. The platform is designed with multi-tenant architecture so every organization has its own documents, users, tickets and AI knowledge base.',
  },
  {
    question: 'Which technologies power SupportIQ?',
    answer:
      'SupportIQ is built with Next.js, Node.js, Express, PostgreSQL, Prisma, ChromaDB, Gemini AI, Tailwind CSS, TypeScript and Cloudinary.',
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-24"
    >
      <div className="mx-auto max-w-4xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-4xl font-bold">

            Frequently Asked Questions

          </h2>

          <p className="mt-4 text-lg text-muted-foreground">

            Everything you need to know about SupportIQ.

          </p>

        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger>

                {faq.question}

              </AccordionTrigger>

              <AccordionContent>

                {faq.answer}

              </AccordionContent>

            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}