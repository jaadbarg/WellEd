'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../app/[locale]/providers';

export default function BestPrepSection({ locale }: { locale: string }) {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('best_prep.title')}
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4">
              {t('best_prep.subtitle')}
            </h3>
            <p className="text-gray-700 mb-8">
              {t('best_prep.description')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href={`/${locale}/paywall?section=best-prep`}>
                <button className="px-6 py-3 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-secondary transition-colors shadow-md">
                  {t('best_prep.learn_more')}
                </button>
              </Link>
              <Link href={`/${locale}/paywall?section=best-prep`}>
                <button className="px-6 py-3 bg-white text-brand-primary font-medium rounded-lg border border-brand-accent/30 hover:bg-brand-accent/10 transition-colors shadow-sm">
                  {t('best_prep.view_sample')}
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-1 rounded-2xl shadow-xl">
              <div className="bg-white rounded-xl overflow-hidden py-5">
                {/* Phone-like container for vertical video */}
                <div className="relative mx-auto bg-black rounded-[40px] p-3 max-w-[280px] shadow-2xl border-8 border-gray-800 transform hover:scale-[1.02] transition-transform duration-300">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-6 bg-black rounded-b-2xl z-10 flex justify-center items-center">
                    <div className="w-16 h-2 bg-gray-800 rounded-full"></div>
                  </div>
                  
                  {/* Video container with proper aspect ratio for vertical video */}
                  <div className="relative pb-[177.78%] bg-gray-900 rounded-3xl overflow-hidden">
                    {/* Fallback placeholder that's always visible behind the video */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0378A6] to-[#0889A6] p-4 text-center">
                      <div className="w-16 h-16 mb-4 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-white">The TAR Method</h3>
                      <p className="text-sm text-white/80 mt-2">Test, Analyze, Review</p>
                    </div>
                    
                    {/* Vertical video */}
                    <video
                      id="tar-method-video"
                      src="https://thesatcrashcourse.com/wp-content/uploads/2024/04/The-Best-SAT-Prep-Method.mp4"
                      className="absolute inset-0 w-full h-full object-cover"
                      poster="https://thesatcrashcourse.com/wp-content/uploads/2024/04/The-Best-SAT-Prep-Method-thumb.jpg"
                      controls={isPlaying}
                      preload="metadata"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    />
                    
                    {/* Play button overlay - only shown when not playing */}
                    {!isPlaying && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                        onClick={() => {
                          const video = document.getElementById('tar-method-video') as HTMLVideoElement;
                          if (video) {
                            video.play();
                            setIsPlaying(true);
                          }
                        }}
                      >
                        <div className="bg-[#0378A6] bg-opacity-80 rounded-full p-4 shadow-lg transform transition-transform hover:scale-110 animate-pulse">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="absolute bottom-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">Watch Demo</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom home button/bar */}
                  <div className="mt-3 w-1/3 h-1.5 bg-gray-700 rounded-full mx-auto"></div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('best_prep.video_title')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('best_prep.video_description')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full z-[-1]"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-purple-100 rounded-full z-[-1]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}