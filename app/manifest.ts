import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The SAT Crash Course',
    short_name: 'SAT Crash Course',
    description: 'Top quality Digital SAT practice tests and prep courses',
    start_url: '/',
    display: 'standalone',
    background_color: '#0378A6',
    theme_color: '#0378A6',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/desktop-home.png',
        sizes: '1280x720',
        type: 'image/png',
      },
      {
        src: '/screenshots/mobile-home.png',
        sizes: '750x1334',
        type: 'image/png',
      },
    ],
    categories: ['education', 'test prep', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'any',
    prefer_related_applications: false,
  };
}