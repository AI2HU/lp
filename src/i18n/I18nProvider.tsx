'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect } from 'react';
import i18n from './config';

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  useEffect(() => {
    i18n.changeLanguage(locale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

