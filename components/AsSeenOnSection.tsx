'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { useLanguage } from '../app/[locale]/providers';

export default function AsSeenOnSection() {
  const { t } = useLanguage();
  const logos = [
    {
      src: "https://thesatcrashcourse.com/wp-content/uploads/2023/09/download-2.webp",
      alt: "Digital Journal",
      width: 200,
      height: 75
    },
    {
      src: "https://thesatcrashcourse.com/wp-content/uploads/2023/09/download-1.webp", // Note: Per requirements, same source for Boston Herald
      alt: "Boston Herald",
      width: 200,
      height: 75
    },
    {
      src: "https://thesatcrashcourse.com/wp-content/uploads/2024/07/NBC.webp",
      alt: "NBC",
      width: 160,
      height: 75
    },
    {
      src: "https://thesatcrashcourse.com/wp-content/uploads/2023/05/foxnews.png",
      alt: "FOX",
      width: 140,
      height: 75
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900"
          >
            {t('as_seen_on.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-lg text-gray-600"
          >
            {t('as_seen_on.subtitle')}
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-16"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={item}
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-16 w-auto object-contain"
                unoptimized={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}