export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'AGENT' | 'CUSTOMER';
  organizationId: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (
    user: User,
    token: string,
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
}