'use client';

interface Props {
  confidence: number;
}

export function ConfidenceBadge({
  confidence,
}: Props) {
  const percent = Math.round(
    confidence * 100,
  );

  let color =
    'bg-red-500/10 text-red-500';

  if (percent >= 90) {
    color =
      'bg-emerald-500/10 text-emerald-500';
  } else if (percent >= 70) {
    color =
      'bg-yellow-500/10 text-yellow-500';
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${color}`}
    >
      Confidence {percent}%
    </span>
  );
}