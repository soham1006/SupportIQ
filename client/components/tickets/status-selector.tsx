'use client';

interface Props {
  value: string;

  loading: boolean;

  onChange: (
    status: string,
  ) => void;
}

const statuses = [
  'OPEN',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
];

export function StatusSelector({
  value,
  loading,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Status
      </h2>

      <select
        value={value}
        disabled={loading}
        onChange={e =>
          onChange(
            e.target.value,
          )
        }
        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none"
      >

        {statuses.map(status => (
          <option
            key={status}
            value={status}
          >
            {status.replace(
              '_',
              ' ',
            )}
          </option>
        ))}

      </select>

    </div>
  );
}