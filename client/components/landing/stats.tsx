'use client';

const stats = [
  {
    value: '6+',
    label: 'Core Modules',
  },
  {
    value: 'AI',
    label: 'Powered by Gemini',
  },
  {
    value: 'RAG',
    label: 'Knowledge Retrieval',
  },
  {
    value: '24/7',
    label: 'AI Availability',
  },
];

export function Stats() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="
                group

                rounded-3xl

                border
                border-border

                bg-card

                p-8

                text-center

                shadow-sm

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-primary/20
                hover:shadow-lg
              "
            >

              <h2
                className="
                  text-5xl

                  font-semibold

                  tracking-tight

                  text-primary
                "
              >
                {stat.value}
              </h2>

              <p
                className="
                  mt-4

                  text-sm

                  leading-6

                  text-muted-foreground
                "
              >
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}