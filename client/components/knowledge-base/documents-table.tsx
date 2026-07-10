'use client';

import {
  FileText,
  MoreHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useDocuments } from '@/features/documents/use-documents';
import { useDeleteDocument } from '@/features/documents/use-delete-document';

interface Document {
  id: string;
  title: string;
  status: 'READY' | 'PROCESSING' | 'FAILED';
  fileSize: number;
  createdAt: string;
  _count?: {
    chunks: number;
  };
}

function StatusBadge({
  status,
}: {
  status: Document['status'];
}) {
  switch (status) {
    case 'READY':
      return <Badge variant="success">Ready</Badge>;

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
      return <Badge>Unknown</Badge>;
  }
}

export function DocumentsTable() {
  const { data, isLoading } =
    useDocuments();

  const deleteDocument =
    useDeleteDocument();

  const documents =
    (data?.data as Document[]) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-3xl border border-border bg-card"
          />
        ))}

      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20">

        <div className="rounded-3xl bg-primary/10 p-5">

          <FileText
            size={36}
            className="text-primary"
          />

        </div>

        <h3 className="mt-6 text-xl font-semibold">

          No documents yet

        </h3>

        <p className="mt-3 max-w-md text-center text-muted-foreground">

          Upload your first PDF and start building
          your AI knowledge base.

        </p>

      </div>
    );
  }

  return (
    <div className="space-y-5">

      {documents.map((doc) => (

        <div
          key={doc.id}
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-6
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-1
            hover:shadow-lg
          "
        >

          <div className="flex items-start justify-between">

            <div className="flex gap-5">

              <div className="rounded-2xl bg-primary/10 p-4">

                <FileText
                  size={24}
                  className="text-primary"
                />

              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h3 className="text-lg font-semibold">

                    {doc.title}

                  </h3>

                  <StatusBadge
                    status={doc.status}
                  />

                </div>

                <p className="mt-1 text-sm text-muted-foreground">

                  PDF Document

                </p>

                <div className="mt-5 flex flex-wrap gap-6 text-sm text-muted-foreground">

                  <span>

                    {doc._count?.chunks ?? 0} chunks

                  </span>

                  <span>

                    {(doc.fileSize / 1024 / 1024).toFixed(2)} MB

                  </span>

                  <span>

                    {new Date(
                      doc.createdAt,
                    ).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}

                  </span>

                </div>

              </div>

            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                deleteDocument.mutate(doc.id)
              }
            >

              <MoreHorizontal size={18} />

            </Button>

          </div>

        </div>

      ))}

    </div>
  );
}