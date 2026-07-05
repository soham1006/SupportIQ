export interface Notification {
  id: string;

  title: string;

  message: string;

  type:
    | 'NEW_TICKET'
    | 'TICKET_ASSIGNED'
    | 'TICKET_RESOLVED'
    | 'DOCUMENT_UPLOADED'
    | 'AGENT_CREATED';

  isRead: boolean;

  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;

  data: Notification[];
}

export interface UnreadCountResponse {
  success: boolean;

  data: {
    count: number;
  };
}