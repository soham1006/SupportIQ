interface Props {
  status: string;
}

export function StatusBadge({
  status,
}: Props) {
  const styles = {
    OPEN: "bg-red-500/10 text-red-400",
    IN_PROGRESS:
      "bg-yellow-500/10 text-yellow-400",
    RESOLVED:
      "bg-primary-400/10 text-emerald-400",
    CLOSED:
      "bg-slate-700 text-slate-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[
          status as keyof typeof styles
        ]
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}