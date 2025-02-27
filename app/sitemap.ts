import { MetadataRoute } from 'next';
import { locales } from './i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thesatcrashcourse.com';
  
  // Generate homepage URLs for all locales
  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));
  
  // Generate URLs for other sections across all locales
  const sections = [
    'practice-tests',
    'practice-tests/dsat',
    'practice-tests/educators',
    'courses',
    'about',
    'about/who-we-are',
    'about/contact',
    'blog',
    'free-test',
    'how-it-works',
  ];
  
  const sectionPages = sections.flatMap((section) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${section}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...homePages,
    ...sectionPages,
  ];
}