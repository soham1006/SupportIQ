'use client';

import { FileText } from 'lucide-react';

interface Source {
  document: string;
  metadata: any;
}

interface Props {
  sources: Source[];
}

export function SourcePanel({
  sources,
}: Props) {
  if (!sources.length) {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">

      <h4 className="mb-3 text-sm font-semibold">
        Sources
      </h4>

      <div className="space-y-3">

        {sources.map(
          (
            source,
            index,
          ) => (

            <div
              key={index}
              className="rounded-lg border border-border p-3"
            >

              <div className="mb-2 flex items-center gap-2">

                <FileText
                  size={16}
                  className="text-primary"
                />

                <span className="text-sm font-medium">
                  Source {index + 1}
                </span>

              </div>

              <p className="text-sm text-muted-foreground">

                {source.document.length >
                180
                  ? `${source.document.slice(
                      0,
                      180,
                    )}...`
                  : source.document}

              </p>

            </div>

          ),
        )}

      </div>

    </div>
  );
}