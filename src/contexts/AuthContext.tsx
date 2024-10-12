import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import { StorageKeys } from '../enums';


interface AuthContextType {
  isLoggedIn: boolean;
  authContextLogin: (token: string) => void;
  authContextLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  React.useEffect(() => {
    const token = AppStorageUtil.getSession(StorageKeys.Jwt);
    setIsLoggedIn(!!token);
  }, [])

  const authContextLogin = (token: string) => {
    AppStorageUtil.setSession(StorageKeys.Jwt, token);
    setIsLoggedIn(true);
  };

  const authContextLogout = () => {
    AppStorageUtil.removeSession(StorageKeys.Jwt);
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, authContextLogin, authContextLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
