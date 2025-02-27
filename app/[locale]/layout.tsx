import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import fs from 'fs';
import path from 'path';
import '../globals.css';
import { getTranslations, locales } from '../i18n';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The SAT Crash Course - Digital SAT Online Test Platform',
  description: 'Top quality Digital SAT practice tests and prep courses to help you achieve your dream score.',
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Manual import of all translation files to ensure they're available
const translations = {
  en: require('../../public/locales/en/common.json'),
  zh: require('../../public/locales/zh/common.json'),
  hi: require('../../public/locales/hi/common.json'),
  ko: require('../../public/locales/ko/common.json'),
  es: require('../../public/locales/es/common.json'),
  vi: require('../../public/locales/vi/common.json')
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Activate i18n
  await getTranslations(locale);
  
  // Get translations for this locale (with fallback to English)
  const messages = translations[locale as keyof typeof translations] || translations.en;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Navbar locale={locale} />
            <main className="flex-grow">{children}</main>
            <Footer locale={locale} />
          </div>
        </Providers>
      </body>
    </html>
  );
}