import { Metadata } from 'next';

// Generate metadata for the paywall page
export const generateMetadata = ({ params: { locale } }: { params: { locale: string } }): Metadata => {
  return {
    title: 'Premium SAT Preparation - Access Your Complete Digital SAT Program',
    description: 'Unlock premium Digital SAT preparation resources, practice tests, and expert guidance to maximize your score potential.',
    robots: 'noindex, nofollow', // Don't index the paywall page
    alternates: {
      canonical: `https://thesatcrashcourse.com/${locale}`,
    }
  };
};