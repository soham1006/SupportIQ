import { api } from '@/lib/api';

import {
  ChatRequest,
  ChatResponse,
  ConversationsResponse,
} from './types';

export async function askAI(
  body: ChatRequest,
) {
  const { data } =
    await api.post<ChatResponse>(
      '/chat',
      body,
    );

  return data;
}

export async function getConversations() {
  const { data } =
    await api.get<ConversationsResponse>(
      '/chat/conversations',
    );

  return data;
}

export async function getMessages(
  conversationId: string,
) {
  const { data } =
    await api.get(
      `/chat/${conversationId}/messages`,
    );

  return data;
}