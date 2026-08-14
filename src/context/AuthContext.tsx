import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/utils/types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual API call
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name: email.split('@')[0],
      username: email.split('@')[0],
      createdAt: new Date(),
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const signup = async (email: string, password: string, name: string) => {
    // TODO: Implement actual API call
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      username: email.split('@')[0],
      createdAt: new Date(),
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = { user, loading, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
