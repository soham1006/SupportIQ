interface Props {
  title: string;
  description: string;
}

export function ErrorState({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-10 text-center">

      <h2 className="text-lg font-semibold text-destructive">
        {title}
      </h2>

      <p className="mt-2 text-muted-foreground">
        {description}
      </p>

    </div>
  );
}