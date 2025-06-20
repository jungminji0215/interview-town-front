'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';

type AuthContextType = {
  token: string | null;
  user: User | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
  initialToken: string | null;
}

/**
 * 서버(layout)에서 넘겨준
 * initialUser/initialToken을 그대로 초기 상태로 사용
 **/
export function AuthProvider({ children, initialUser, initialToken }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<User | null>(initialUser); // TODO user 정보는 tanstack query 로 조회하는 것으로 변경하기

  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};
