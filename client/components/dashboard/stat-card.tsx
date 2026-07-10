import { LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <Card
      className="
        group

        cursor-pointer

        p-6

        transition-all
        duration-200

        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]

              text-muted-foreground
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-4

              text-3xl
              font-semibold
              tracking-tight

              text-foreground

              lg:text-4xl
            "
          >
            {value}
          </h2>

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            border
            border-border

            bg-muted

            transition-all
            duration-200

            group-hover:bg-accent
            group-hover:border-primary/20
          "
        >

          <Icon
            size={28}
            className="
              text-primary
              transition-transform
              duration-200

              group-hover:scale-110
            "
          />

        </div>

      </div>

    </Card>
  );
}