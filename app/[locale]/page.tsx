import HeroSection from '../../components/HeroSection';
import OfferingsSection from '../../components/OfferingsSection';
import BestPrepSection from '../../components/BestPrepSection';
import PracticeTestsSection from '../../components/PracticeTestsSection';
import AsSeenOnSection from '../../components/AsSeenOnSection';
import { getTranslations } from '../i18n';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  // We don't need to pass the translation function directly to components anymore
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