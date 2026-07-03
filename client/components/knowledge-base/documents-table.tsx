'use client';

import {
  FileText,
  MoreHorizontal,
  RefreshCcw,
  Trash2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const documents = [
  {
    id: '1',
    name: 'Employee Handbook.pdf',
    status: 'INDEXED',
    chunks: 124,
    size: '2.4 MB',
    uploaded: '2 hours ago',
  },
  {
    id: '2',
    name: 'Refund Policy.pdf',
    status: 'INDEXED',
    chunks: 58,
    size: '1.1 MB',
    uploaded: 'Yesterday',
  },
  {
    id: '3',
    name: 'HR Guidelines.pdf',
    status: 'PROCESSING',
    chunks: '-',
    size: '3.2 MB',
    uploaded: 'Just now',
  },
];

function StatusBadge({
  status,
}: {
  status: string;
}) {
  switch (status) {
    case 'INDEXED':
      return (
        <Badge variant="success">
          Indexed
        </Badge>
      );

    case 'PROCESSING':
      return (
        <Badge variant="warning">
          Processing
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          Unknown
        </Badge>
      );
  }
}

export function DocumentsTable() {
  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b border-border text-left text-sm text-muted-foreground">

            <th className="px-6 py-4">
              Document
            </th>

            <th>Status</th>

            <th>Chunks</th>

            <th>Size</th>

            <th>Uploaded</th>

            <th className="text-right pr-6">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {documents.map(doc => (

            <tr
              key={doc.id}
              className="border-b border-border transition hover:bg-muted/40"
            >

              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                    <FileText
                      size={20}
                      className="text-primary"
                    />

                  </div>

                  <div>

                    <p className="font-medium">
                      {doc.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      PDF Document
                    </p>

                  </div>

                </div>

              </td>

              <td>
                <StatusBadge
                  status={doc.status}
                />
              </td>

              <td>
                {doc.chunks}
              </td>

              <td>
                {doc.size}
              </td>

              <td>
                {doc.uploaded}
              </td>

              <td>

                <div className="flex justify-end gap-2 pr-6">

                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <RefreshCcw
                      size={16}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2
                      size={16}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <MoreHorizontal
                      size={16}
                    />
                  </Button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}