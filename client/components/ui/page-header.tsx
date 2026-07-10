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
    <header
      className="
        mb-10

        flex
        flex-col
        gap-5

        sm:flex-row
        sm:items-end
        sm:justify-between
      "
    >
      <div className="space-y-2">

        <h1
          className="
            text-3xl
            font-semibold
            tracking-tight

            text-foreground

            sm:text-4xl
          "
        >
          {title}
        </h1>

        <p
          className="
            max-w-2xl

            text-sm
            leading-7

            text-muted-foreground

            sm:text-base
          "
        >
          {description}
        </p>

      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </header>
  );
}