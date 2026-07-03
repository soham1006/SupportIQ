import {
  useMutation,
} from '@tanstack/react-query';

import { generateAIReply } from './api';

export function useAIReply() {
  return useMutation({
    mutationFn: (ticketId: string) =>
      generateAIReply(ticketId),
  });
}