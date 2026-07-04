'use client';

import { useRef } from 'react';

import { Upload } from 'lucide-react';

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

    await upload.mutateAsync(
      file,
    );
  }

  return (
    <>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf"
        onChange={e => {
          const file =
            e.target.files?.[0];

          if (file) {
            handleFile(file);
          }
        }}
      />

      <Button
        onClick={() =>
          inputRef.current?.click()
        }
        disabled={
          upload.isPending
        }
      >

        <Upload size={18} />

        {upload.isPending
          ? 'Uploading...'
          : 'Upload Document'}

      </Button>

    </>
  );
}