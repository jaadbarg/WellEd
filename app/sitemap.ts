import { MetadataRoute } from 'next';
import { locales } from './i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thesatcrashcourse.com';
  const lastModified = new Date();
  
  // Generate homepage URLs for all locales
  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));
  
  // Generate URLs for other sections across all locales
  const sections = [
    'practice-tests',
    'practice-tests/dsat',
    'practice-tests/educators',
    'courses',
    'courses/sat-full-course',
    'courses/math-intensive',
    'courses/reading-writing',
    'about',
    'about/who-we-are',
    'about/contact',
    'about/testimonials',
    'blog',
    'free-test',
    'how-it-works',
    'faqs',
    'terms',
    'privacy',
  ];
  
  // Add section pages for all locales
  const sectionPages = sections.flatMap((section) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${section}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );
  
  // Blog posts to add
  const blogPosts = [
    'digital-sat-update-2025',
    '5-essential-digital-sat-strategies',
    'math-section-mastery-guide',
    'reading-comprehension-techniques',
    'college-application-timeline',
    'sat-vs-act-comparison',
    'test-anxiety-management',
    'calculator-tips-digital-sat',
  ];
  
  // Blog posts only for fully supported languages
  const primaryLanguages = ['en', 'zh', 'es'];
  const blogPages = blogPosts.flatMap((post) => 
    primaryLanguages.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );
  
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...homePages,
    ...sectionPages,
    ...blogPages,
  ];
}