'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 사용자 정보를 가져오는 API 호출 함수
// 이제 BFF 프록시를 통해 안전하게 호출됩니다.
const fetchMe = async (): Promise<User | null> => {
  try {
    const response = await fetch('/api/me'); // BFF 프록시 호출
    if (!response.ok) return null;
    const data = await response.json();
    return data.user;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: fetchMe,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const value = {
    user: user ?? null,
    isLoggedIn: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};
