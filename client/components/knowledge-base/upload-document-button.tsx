'use client';

import { useRef } from 'react';

import {
  Loader2,
  Upload,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useUploadDocument } from '@/features/documents/use-upload-document';

export function UploadDocumentButton() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const upload =
    useUploadDocument();

  async function handleFile(
    file: File,
  ) {
    if (!file) return;

    await upload.mutateAsync(file);
  }

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          if (file) {
            handleFile(file);
          }

          e.target.value = '';
        }}
      />

      <Button
        size="lg"
        disabled={upload.isPending}
        onClick={() =>
          inputRef.current?.click()
        }
        className="
          min-w-[210px]
          rounded-2xl
          px-6
          py-6
          shadow-lg
          hover:shadow-xl
        "
      >
        {upload.isPending ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />

            Uploading...
          </>
        ) : (
          <>
            <Upload size={18} />

            Upload PDF
          </>
        )}
      </Button>
    </>
  );
}