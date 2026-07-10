'use client';

import {
  FileText,
  CheckCircle2,
  Loader2,
  Boxes,
} from 'lucide-react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';

import { DocumentsTable } from './documents-table';
import { UploadDocumentButton } from './upload-document-button';

import { useDocuments } from '@/features/documents/use-documents';

export function KnowledgePage() {
  const { data, isLoading } = useDocuments();

  const documents = data?.data ?? [];

  const totalDocuments = documents.length;

  const readyDocuments = documents.filter(
    (doc: any) => doc.status === 'READY'
  ).length;

  const processingDocuments = documents.filter(
    (doc: any) => doc.status === 'PROCESSING'
  ).length;

  const totalChunks = documents.reduce(
    (total: number, doc: any) =>
      total + (doc._count?.chunks ?? 0),
    0
  );

  const stats = [
    {
      title: 'Documents',
      value: totalDocuments,
      icon: FileText,
    },
    {
      title: 'Ready',
      value: readyDocuments,
      icon: CheckCircle2,
    },
    {
      title: 'Processing',
      value: processingDocuments,
      icon: Loader2,
    },
    {
      title: 'Chunks',
      value: totalChunks,
      icon: Boxes,
    },
  ];

  return (
    <DashboardLayout>

      <div className="space-y-10">

        {/* Header */}

        <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">

              Knowledge Base

            </p>

            <h1 className="mt-3 text-5xl font-semibold tracking-tight">

              AI Documents

            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">

              Upload PDFs and documentation to build your
              organizations searchable AI knowledge base.

            </p>

          </div>

          <UploadDocumentButton />

        </section>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (

              <Card
                key={stat.title}
                className="group p-7"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-muted-foreground">

                      {stat.title}

                    </p>

                    <h2 className="mt-4 text-4xl font-semibold">

                      {isLoading
                        ? '--'
                        : stat.value}

                    </h2>

                  </div>

                  <div className="rounded-2xl bg-primary/10 p-4 transition group-hover:bg-primary/15">

                    <Icon
                      size={24}
                      className="text-primary"
                    />

                  </div>

                </div>

              </Card>

            );

          })}

        </div>

        {/* Documents */}

        <section>

          <div className="mb-8">

            <h2 className="text-2xl font-semibold">

              Documents

            </h2>

            <p className="mt-2 text-muted-foreground">

              PDFs currently indexed by your AI assistant.

            </p>

          </div>

          <DocumentsTable />

        </section>

      </div>

    </DashboardLayout>
  );
}