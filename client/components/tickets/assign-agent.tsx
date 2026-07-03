'use client';


interface Agent {
  id: string;
  name: string;
}

interface Props {
  agents: Agent[];

  selected?: string;

  loading: boolean;

  onAssign: (
    agentId: string,
  ) => void;
}

export function AssignAgent({
  agents,
  selected,
  loading,
  onAssign,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Assigned Agent
      </h2>

      <select
        defaultValue={
          selected ?? ''
        }
        onChange={e =>
          onAssign(
            e.target.value,
          )
        }
        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none"
      >
        <option value="">
          Unassigned
        </option>

        {agents.map(agent => (
          <option
            key={agent.id}
            value={agent.id}
          >
            {agent.name}
          </option>
        ))}

      </select>

      {loading && (
        <p className="mt-3 text-sm text-muted-foreground">
          Updating...
        </p>
      )}

    </div>
  );
}