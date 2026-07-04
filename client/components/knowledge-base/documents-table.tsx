'use client';

import {
  FileText,
  MoreHorizontal,
  RefreshCcw,
  Trash2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useDocuments } from '@/features/documents/use-documents';
import { useDeleteDocument } from '@/features/documents/use-delete-document';

function StatusBadge({
  status,
}: {
  status: string;
}) {
  switch (status) {
    case 'READY':
      return (
        <Badge variant="success">
          Ready
        </Badge>
      );

    case 'PROCESSING':
      return (
        <Badge variant="warning">
          Processing
        </Badge>
      );

    case 'FAILED':
      return (
        <Badge variant="destructive">
          Failed
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
  const { data, isLoading } =
    useDocuments();

  const deleteDocument =
    useDeleteDocument();

  const documents =
    data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading documents...
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">

        <FileText
          size={42}
          className="text-muted-foreground"
        />

        <div className="text-center">

          <h3 className="font-semibold">
            No documents uploaded
          </h3>

          <p className="text-sm text-muted-foreground">
            Upload your first PDF to start building your AI knowledge base.
          </p>

        </div>

      </div>
    );
  }

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

          {documents.map((doc: any) => (

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
                      {doc.title}
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

                {doc._count?.chunks ?? 0}

              </td>

              <td>

                {(doc.fileSize / 1024 / 1024).toFixed(2)} MB

              </td>

              <td>

                {new Date(
                  doc.createdAt,
                ).toLocaleDateString()}

              </td>

              <td>

                <div className="flex justify-end gap-2 pr-6">

                  <Button
                    variant="ghost"
                    size="icon"
                    title="Re-index (Coming Soon)"
                  >
                    <RefreshCcw
                      size={16}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={
                      deleteDocument.isPending
                    }
                    onClick={() =>
                      deleteDocument.mutate(
                        doc.id,
                      )
                    }
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