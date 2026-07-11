'use client';

import {
  useEffect,
  useState,
} from 'react';

import { AuthContext } from './auth-context';
import { User } from './auth.types';

import {
  getMe,
  logout as logoutApi,
} from './api';

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refreshUser() {
    try {
      const token =
        localStorage.getItem(
          'accessToken',
        );

      if (!token) {
        setUser(null);
        return;
      }

      const response =
        await getMe();

      setUser(response.data);
    } catch {
      localStorage.removeItem(
        'accessToken',
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshUser();
  }, []);

  async function login(
    authenticatedUser: User,
    token: string,
  ) {
    localStorage.setItem(
      'accessToken',
      token,
    );

    setUser(
      authenticatedUser,
    );
  }

  async function logout() {
    try {
      await logoutApi();
    } catch {
      // The server session may already be expired.
      // Local authentication should still be cleared.
    } finally {
      localStorage.removeItem(
        'accessToken',
      );

      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}