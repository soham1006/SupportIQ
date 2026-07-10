'use client';

import { Customer } from '@/features/customer/customer.types';

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: Props) {
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

          {customers.map(customer => (

            <tr
              key={customer.id}
              className="border-b last:border-none"
            >

              <td className="px-6 py-4 font-medium">
                {customer.name}
              </td>

              <td className="px-6 py-4">
                {customer.email}
              </td>

              <td className="px-6 py-4">
                {customer._count?.customerTickets ?? 0}
              </td>

              <td className="px-6 py-4">

                {customer.isActive ? (

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
                  onClick={() =>
                    onEdit(customer)
                  }
                  className="mr-4 text-primary-500 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(customer)
                  }
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}