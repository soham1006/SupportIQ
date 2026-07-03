interface Props {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="mt-2 text-slate-400">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}