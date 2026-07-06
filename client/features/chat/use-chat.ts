import { useMutation } from '@tanstack/react-query';

import { askAI } from './api';

export function useChat() {
  return useMutation({
    mutationFn: askAI,
  });
}