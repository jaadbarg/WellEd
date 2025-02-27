import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import fs from 'fs';
import path from 'path';
import '../globals.css';
import { getTranslations, locales } from '../i18n';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Schema from '../../components/Schema';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'The SAT Crash Course - #1 Digital SAT Online Test Platform',
  description: 'Achieve your dream SAT score with our top-quality Digital SAT practice tests and prep courses. Personalized learning, realistic practice tests, and expert guidance.',
  keywords: 'SAT, Digital SAT, SAT prep, SAT practice test, SAT courses, college admissions, test prep, SAT crash course, SAT online',
  authors: [{ name: 'The SAT Crash Course Team' }],
  robots: 'index, follow',
  icons: [
    {
      rel: 'icon',
      url: 'https://thesatcrashcourse.com/wp-content/uploads/2024/01/the-sat-crash-course-logo.png'
    },
    {
      rel: 'apple-touch-icon',
      url: 'https://thesatcrashcourse.com/wp-content/uploads/2024/01/the-sat-crash-course-logo.png'
    }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thesatcrashcourse.com',
    siteName: 'The SAT Crash Course',
    title: 'The SAT Crash Course - Digital SAT Online Preparation',
    description: 'Ace the SAT with our adaptive practice tests and personalized study plans. Top quality Digital SAT preparation for students aiming for 1600.',
    images: [
      {
        url: 'https://thesatcrashcourse.com/wp-content/uploads/2024/01/the-sat-crash-course-logo.png',
        width: 800,
        height: 600,
        alt: 'The SAT Crash Course',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The SAT Crash Course - Digital SAT Online Preparation',
    description: 'Boost your SAT score with our digital preparation platform. Expert guidance, practice tests, and personalized learning.',
    images: ['https://thesatcrashcourse.com/wp-content/uploads/2024/01/the-sat-crash-course-logo.png'],
  },
  alternates: {
    canonical: 'https://thesatcrashcourse.com',
    languages: {
      'en': 'https://thesatcrashcourse.com/en',
      'zh': 'https://thesatcrashcourse.com/zh',
      'hi': 'https://thesatcrashcourse.com/hi',
      'ko': 'https://thesatcrashcourse.com/ko',
      'es': 'https://thesatcrashcourse.com/es',
      'vi': 'https://thesatcrashcourse.com/vi',
    },
  },
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
            <Schema />
            <Analytics />
            <SpeedInsights />
          </div>
        </Providers>
      </body>
    </html>
  );
}