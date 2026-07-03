'use client';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  priority: string;
  onPriorityChange: (value: string) => void;
}

export function TicketFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">

      <div className="grid gap-4 lg:grid-cols-3">

        {/* Search */}

        <input
          value={search}
          onChange={e =>
            onSearchChange(e.target.value)
          }
          placeholder="Search tickets..."
          className="h-11 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
        />

        {/* Status */}

        <select
          value={status}
          onChange={e =>
            onStatusChange(e.target.value)
          }
          className="h-11 rounded-xl border border-border bg-background px-4 outline-none"
        >
          <option value="ALL">
            All Status
          </option>

          <option value="OPEN">
            Open
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="RESOLVED">
            Resolved
          </option>

          <option value="CLOSED">
            Closed
          </option>

        </select>

        {/* Priority */}

        <select
          value={priority}
          onChange={e =>
            onPriorityChange(
              e.target.value,
            )
          }
          className="h-11 rounded-xl border border-border bg-background px-4 outline-none"
        >
          <option value="ALL">
            All Priority
          </option>

          <option value="HIGH">
            High
          </option>

          <option value="MEDIUM">
            Medium
          </option>

          <option value="LOW">
            Low
          </option>

        </select>

      </div>

    </div>
  );
}