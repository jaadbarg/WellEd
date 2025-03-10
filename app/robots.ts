import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '/*/paywall',
      ],
    },
    sitemap: 'https://thesatcrashcourse.com/sitemap.xml',
    host: 'https://thesatcrashcourse.com',
  };
}