export interface ChatRequest {
  question: string;

  conversationId?: string;
}

export interface ChatSource {
  document: string;

  metadata: any;
}

export interface ChatResponse {
  success: boolean;

  data: {
    conversationId: string;

    answer: string;

    confidence: number;

    shouldEscalate: boolean;

    ticket: any;

    sources: ChatSource[];
  };
}

export interface Conversation {
  id: string;

  createdAt: string;

  updatedAt: string;

  messages: {
    id: string;

    role: 'USER' | 'ASSISTANT';

    content: string;
  }[];
}

export interface ConversationsResponse {
  success: boolean;

  data: Conversation[];
}