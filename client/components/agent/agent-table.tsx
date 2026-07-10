'use client';

import { Agent } from '../../features/agent/agent.types';

interface Props {
  agents: Agent[];
}
import { useState } from 'react';
import { EditAgentDialog } from '../../features/agent/edit-agent-dialog';
import { DeleteAgentDialog } from './delete-agent-dialog';

export function AgentTable({
  agents,
}: Props) {

const [selectedAgent, setSelectedAgent] =
useState<Agent | null>(null);

const [open, setOpen] =
  useState(false);

  const [
  deleteId,
  setDeleteId,
] = useState<string | null>(
  null,
);

const [
  deleteOpen,
  setDeleteOpen,
] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border bg-card">

      <table className="w-full">

        <thead className="border-b bg-muted/40">

          <tr>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Skills
            </th>

            <th className="px-6 py-4 text-left">
              Tickets
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {agents.map(agent => (

            <tr
              key={agent.id}
              className="border-b last:border-none"
            >

              <td className="px-6 py-4 font-medium">
                {agent.name}
              </td>

              <td className="px-6 py-4">
                {agent.email}
              </td>

              <td className="px-6 py-4">

                <div className="flex flex-wrap gap-2">

                  {agent.skills.map(skill => (

                    <span
                      key={skill}
                      className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </td>

              <td className="px-6 py-4">

                {agent._count?.assignedTickets ?? 0}

              </td>

              <td className="px-6 py-4">

                {agent.isActive ? (

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>

                ) : (

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Inactive
                  </span>

                )}

              </td>

              <td className="px-6 py-4 text-right">

               <button
  onClick={() => {
    setSelectedAgent(agent);
    setOpen(true);
  }}
  className="mr-3 text-primary-500 hover:underline"
>
  Edit
</button>

               <button
  onClick={() => {
    setDeleteId(agent.id);
    setDeleteOpen(true);
  }}
  className="text-red-600 hover:underline"
>
  Delete
</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
     <EditAgentDialog
  key={selectedAgent?.id}
  agent={selectedAgent}
  open={open}
  onOpenChange={setOpen}
/>
<DeleteAgentDialog
  id={deleteId}
  open={deleteOpen}
  onOpenChange={
    setDeleteOpen
  }
/>

    </div>
  );
}