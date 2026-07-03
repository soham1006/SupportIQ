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
    <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white">
        {value}
      </h2>
    </div>

    <div className="rounded-2xl bg-emerald-500/10 p-4 transition-all group-hover:bg-emerald-500/20">
      <Icon
        size={30}
        className="text-emerald-400"
      />
    </div>
  </div>
</Card>
  );
}