'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../app/[locale]/providers';

export default function OfferingsSection({ locale }: { locale: string }) {
  const { t } = useLanguage();
  const offerings = [
    {
      title: t('offerings.crash_course'),
      subtitle: t('offerings.crash_course_subtitle'),
      features: [
        t('offerings.crash_course_features.feature1'),
        t('offerings.crash_course_features.feature2'),
        t('offerings.crash_course_features.feature3')
      ],
      icon: (
        <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: t('offerings.practice_tests'),
      subtitle: t('offerings.practice_tests_subtitle'),
      features: [
        t('offerings.practice_tests_features.feature1'),
        t('offerings.practice_tests_features.feature2'),
        t('offerings.practice_tests_features.feature3')
      ],
      icon: (
        <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            {t('offerings.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-600"
          >
            {t('offerings.subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-50 p-3 rounded-2xl mr-4">
                  {offering.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{offering.title}</h3>
                  <p className="text-blue-600 font-medium">{offering.subtitle}</p>
                </div>
              </div>
              
              <ul className="space-y-4 mt-6">
                {offering.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link href={`/${locale}/paywall?section=offerings`}>
                  <button className="inline-flex items-center font-medium text-brand-primary hover:text-brand-secondary">
                    {t('offerings.learn_more')}
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}