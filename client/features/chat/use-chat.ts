'use client';

import { useMutation } from '@tanstack/react-query';

import { sendMessage } from '@/services/chat.service';

export function useChat() {
  return useMutation({
    mutationFn: sendMessage,
  });
}