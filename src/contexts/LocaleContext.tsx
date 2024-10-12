import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppStorageUtil } from '../utils/AppStorageUtil';
import { Locale, StorageKeys } from '../enums';

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>(AppStorageUtil.getLocal(StorageKeys.Locale) ?? Locale.en);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
