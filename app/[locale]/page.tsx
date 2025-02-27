import HeroSection from '../../components/HeroSection';
import OfferingsSection from '../../components/OfferingsSection';
import BestPrepSection from '../../components/BestPrepSection';
import PracticeTestsSection from '../../components/PracticeTestsSection';
import AsSeenOnSection from '../../components/AsSeenOnSection';
import { getTranslations } from '../i18n';

import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  // Generate language-specific metadata
  const localizedTitles = {
    en: 'The SAT Crash Course - #1 Digital SAT Online Test Platform',
    zh: '数字SAT速成班 - 顶级在线备考平台',
    hi: 'द SAT क्रैश कोर्स - #1 डिजिटल SAT ऑनलाइन प्लेटफॉर्म',
    ko: 'SAT 속성 과정 - 최고의 디지털 SAT 온라인 플랫폼',
    es: 'El Curso Intensivo SAT - Plataforma #1 para el SAT Digital',
    vi: 'Khóa Học Cấp Tốc SAT - Nền Tảng Trực Tuyến SAT Kỹ Thuật Số #1'
  };
  
  const localizedDescriptions = {
    en: 'Achieve your dream score with our top-quality Digital SAT prep. Personalized learning, realistic practice tests, and expert guidance for college admissions success.',
    zh: '通过我们的高质量数字SAT准备课程实现您的梦想分数。个性化学习、真实模拟考试和专家指导，助您顺利进入理想大学。',
    hi: 'हमारी उच्च गुणवत्ता वाली डिजिटल SAT तैयारी के साथ अपने सपनों के स्कोर को प्राप्त करें। कॉलेज प्रवेश सफलता के लिए व्यक्तिगत सीखने, यथार्थवादी अभ्यास परीक्षण और विशेषज्ञ मार्गदर्शन।',
    ko: '최고 품질의 디지털 SAT 준비를 통해 꿈의 점수를 달성하세요. 대학 입시 성공을 위한 맞춤형 학습, 현실적인 모의고사 및 전문가 지도.',
    es: 'Logra tu puntaje soñado con nuestra preparación de alta calidad para el SAT Digital. Aprendizaje personalizado, exámenes de práctica realistas y orientación experta para el éxito en las admisiones universitarias.',
    vi: 'Đạt được điểm số mơ ước với khóa học chuẩn bị SAT Kỹ thuật số chất lượng cao của chúng tôi. Học tập cá nhân hóa, bài kiểm tra thực tế và hướng dẫn chuyên gia để thành công trong tuyển sinh đại học.'
  };
  
  // Determine the correct OG image path based on locale
  const ogImagePath = locale === 'en' 
    ? '/og-image-en.jpg'
    : `/og-image-${locale}.jpg`;
  
  return {
    title: localizedTitles[locale as keyof typeof localizedTitles] || localizedTitles.en,
    description: localizedDescriptions[locale as keyof typeof localizedDescriptions] || localizedDescriptions.en,
    alternates: {
      canonical: `https://thesatcrashcourse.com/${locale}`,
      languages: {
        'en': 'https://thesatcrashcourse.com/en',
        'zh': 'https://thesatcrashcourse.com/zh',
        'hi': 'https://thesatcrashcourse.com/hi',
        'ko': 'https://thesatcrashcourse.com/ko',
        'es': 'https://thesatcrashcourse.com/es',
        'vi': 'https://thesatcrashcourse.com/vi',
      },
    },
    openGraph: {
      title: localizedTitles[locale as keyof typeof localizedTitles] || localizedTitles.en,
      description: localizedDescriptions[locale as keyof typeof localizedDescriptions] || localizedDescriptions.en,
      images: [
        {
          url: `https://thesatcrashcourse.com${ogImagePath}`,
          width: 1200,
          height: 630,
          alt: `The SAT Crash Course - ${locale.toUpperCase()}`,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedTitles[locale as keyof typeof localizedTitles] || localizedTitles.en,
      description: localizedDescriptions[locale as keyof typeof localizedDescriptions] || localizedDescriptions.en,
      images: [`https://thesatcrashcourse.com${ogImagePath}`],
    }
  };
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  // Load translations
  await getTranslations(locale);
  
  return (
    <div>
      <HeroSection locale={locale} />
      <OfferingsSection locale={locale} />
      <BestPrepSection locale={locale} />
      <PracticeTestsSection locale={locale} />
      <AsSeenOnSection />
    </div>
  );
}