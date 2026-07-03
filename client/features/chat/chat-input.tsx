'use client';

import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({
  onSend,
  isLoading,
}: Props) {
  const [text, setText] =
    useState('');

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  function resize() {
    if (!textareaRef.current) return;

    textareaRef.current.style.height =
      '0px';

    textareaRef.current.style.height =
      Math.min(
        textareaRef.current.scrollHeight,
        140,
      ) + 'px';
  }

  function submit() {
    if (!text.trim() || isLoading)
      return;

    onSend(text);

    setText('');

    if (textareaRef.current)
      textareaRef.current.style.height =
        '28px';
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
      className="flex items-end gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        disabled={isLoading}
        placeholder="Ask SupportIQ anything..."
        onChange={e => {
          setText(e.target.value);
          resize();
        }}
        onKeyDown={e => {
          if (
            e.key === 'Enter' &&
            !e.shiftKey
          ) {
            e.preventDefault();
            submit();
          }
        }}
        className="
          min-h-[28px]
          max-h-36
          flex-1
          resize-none
          overflow-y-auto
          bg-transparent
          px-1
          py-1
          text-[15px]
          leading-7
          text-foreground
          placeholder:text-muted-foreground
          outline-none
        "
      />

      <Button
        type="submit"
        disabled={
          isLoading ||
          !text.trim()
        }
        className="h-10 w-10 rounded-xl p-0"
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <ArrowUp size={18} />
        )}
      </Button>
    </form>
  );
}