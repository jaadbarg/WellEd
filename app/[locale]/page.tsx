import HeroSection from '../../components/HeroSection';
import OfferingsSection from '../../components/OfferingsSection';
import BestPrepSection from '../../components/BestPrepSection';
import PracticeTestsSection from '../../components/PracticeTestsSection';
import AsSeenOnSection from '../../components/AsSeenOnSection';
import { getTranslations } from '../i18n';

import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  // Use fixed values instead of relying on translations
  return {
    title: 'The SAT Crash Course - Digital SAT Online Test Platform',
    description: 'Achieve your dream score with our top-quality Digital SAT prep. Personalized learning, realistic practice tests, and expert guidance.',
    alternates: {
      canonical: `https://thesatcrashcourse.com/${locale}`,
    }
  };
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  // Load translations
  await getTranslations(locale);
  
  return (
    <div>
      <HeroSection locale={locale} />
      <OfferingsSection />
      <BestPrepSection />
      <PracticeTestsSection locale={locale} />
      <AsSeenOnSection />
    </div>
  );
}