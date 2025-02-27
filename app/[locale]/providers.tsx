'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { locales } from '../i18n';
import { motion, AnimatePresence } from 'framer-motion';

// Create context
type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
};

// Safe access to nested properties
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null) return undefined;
    result = result[key];
  }
  
  return result;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

// Provider component
export function Providers({
  children,
  locale,
  messages
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  const [currentLocale, setCurrentLocale] = useState(locale);
  
  // Simple translation function
  const t = (key: string): string => {
    const value = getNestedValue(messages, key);
    if (typeof value === 'string') {
      return value;
    }
    console.warn(`Missing translation for key: ${key} in locale: ${locale}`);
    return key;
  };
  
  // Change the path when locale changes
  useEffect(() => {
    if (currentLocale !== locale) {
      const currentPath = window.location.pathname;
      const segments = currentPath.split('/');
      
      // Replace the locale segment
      if (locales.includes(segments[1])) {
        segments[1] = currentLocale;
      } else {
        segments.splice(1, 0, currentLocale);
      }
      
      const newPath = segments.join('/');
      window.location.href = newPath;
    }
  }, [currentLocale, locale]);

  return (
    <LanguageContext.Provider value={{ locale: currentLocale, setLocale: setCurrentLocale, t }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={locale}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LanguageContext.Provider>
  );
}