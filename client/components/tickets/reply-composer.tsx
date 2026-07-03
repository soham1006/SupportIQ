'use client';

import {
  Send,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  onSend: (message: string) => void;
  onGenerate: () => void;

  loading: boolean;
  generating: boolean;

  value: string;
  onChange: (value: string) => void;
}

export function ReplyComposer({
  onSend,
  onGenerate,
  loading,
  generating,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">

      <h2 className="mb-5 text-lg font-semibold">
        Reply
      </h2>

      <Textarea
        rows={6}
        value={value}
        placeholder="Write a reply..."
        onChange={e =>
          onChange(e.target.value)
        }
      />

      <div className="mt-5 flex items-center justify-between">

        <Button
          variant="outline"
          onClick={onGenerate}
          disabled={generating}
        >
          <Sparkles size={18} />

          {generating
            ? 'Generating...'
            : 'Generate AI Reply'}
        </Button>

        <Button
          onClick={() => onSend(value)}
          disabled={
            loading ||
            !value.trim()
          }
        >
          <Send size={18} />

          {loading
            ? 'Sending...'
            : 'Send Reply'}
        </Button>

      </div>

    </div>
  );
}