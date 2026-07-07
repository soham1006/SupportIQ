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
    <section className="border-y bg-muted/20 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-10 text-center md:grid-cols-2 xl:grid-cols-4">

          {stats.map(stat => (

            <div key={stat.label}>

              <h2 className="text-4xl font-bold text-emerald-500">

                {stat.value}

              </h2>

              <p className="mt-3 text-muted-foreground">

                {stat.label}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}