'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSession } from '@/api/auth';
import { User } from '@/types/user';

type AuthContextType = {
  token: string | null | undefined;
  user: User | null | undefined;
  isLoading: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [user, setUser] = useState<User | null | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { isLoggedIn, accessToken, user } = await getSession();

        if (!isLoggedIn || !accessToken) {
          setToken(null);
          setUser(null);
          return;
        }

        setToken(accessToken);
        setUser(user);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setToken, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};
