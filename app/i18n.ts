import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import fs from 'fs';
import path from 'path';

export const locales = ['en', 'zh', 'hi', 'ko', 'es', 'vi'];
export const defaultLocale = 'en';

// Cache for translation data
const translationCache: Record<string, Record<string, any>> = {};

// Function to preload translations
export const getTranslationsSync = (locale: string): Record<string, any> => {
  if (translationCache[locale]) {
    return translationCache[locale];
  }
  
  try {
    // This is a simplified version for demonstration - in a real app, use a more robust approach
    const translations = require(`../public/locales/${locale}/common.json`);
    translationCache[locale] = translations;
    return translations;
  } catch (e) {
    console.error(`Could not load translations for locale ${locale}`, e);
    // Fallback to English
    if (locale !== 'en') {
      return getTranslationsSync('en');
    }
    return {};
  }
};

const initI18next = async (locale: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`../public/locales/${language}/${namespace}.json`)))
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      defaultNS: 'common',
      fallbackNS: 'common',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });

  return i18nInstance;
};

export async function getTranslations(locale: string, namespaces: string[] = ['common']) {
  const i18nextInstance = await initI18next(locale);
  
  // Pre-load translations
  getTranslationsSync(locale);
  
  return {
    t: (key: string, params?: Record<string, string>) => i18nextInstance.t(key, params),
    i18n: i18nextInstance
  };
}