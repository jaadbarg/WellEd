'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';

import { useLanguage } from '../app/[locale]/providers';

export default function HeroSection({ locale }: { locale: string }) {
  const { t } = useLanguage();
  // Animation controls for tablet elements
  const tabletControls = useAnimation();
  const backgroundControls = useAnimation();
  const interfaceControls = useAnimation();
  const buttonsControls = useAnimation();
  const glareControls = useAnimation();
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Start the animation sequence
  const startAnimation = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Reset all elements
    await Promise.all([
      tabletControls.set({ y: 30, rotate: -3, opacity: 1 }),
      backgroundControls.set({ opacity: 0, scale: 0.8, rotate: -10 }),
      interfaceControls.set({ opacity: 0 }),
      buttonsControls.set({ scaleY: 0 }),
      glareControls.set({ opacity: 0, right: "100%" })
    ]);
    
    // Animate tablet frame
    await tabletControls.start({
      y: 0,
      rotate: 1,
      transition: { 
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    });
    
    // Animate background
    backgroundControls.start({
      opacity: 0.2,
      scale: 1,
      rotate: -6,
      transition: { 
        duration: 1.2,
        type: "spring",
        stiffness: 100 
      }
    });
    
    // Animate interface
    await interfaceControls.start({
      opacity: 1,
      transition: { duration: 0.4 }
    });
    
    // Animate buttons
    await buttonsControls.start({
      scaleY: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 }
    });
    
    // Start glare animation
    await glareControls.start({
      opacity: [0, 0.07, 0],
      right: ["100%", "-10%", "-100%"],
      transition: { 
        duration: 2.5,
        repeat: 0
      }
    });
    
    // Animation sequence complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000); // Allow animations to finish before enabling restart
  };
  
  // Start initial animation and set up interval
  useEffect(() => {
    startAnimation();
    
    // Set up interval to restart animation every 5 seconds
    const interval = setInterval(() => {
      startAnimation();
    }, 10000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <section className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-blue-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
             }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-light leading-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            <div className="mt-6 text-lg md:text-xl text-brand-light max-w-2xl overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="block font-medium"
                >
                  {t('hero.subtitle')}
                </motion.span>
                
                <div className="mt-3 flex flex-col space-y-1">
                  {/* Keep these hardcoded in English as they're part of the main subtitle which is already translated */}
                  {["Personalized learning", "Realistic practice tests", "Expert guidance"].map((text, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.5 + (index * 0.15),
                        type: "spring",
                        stiffness: 100
                      }}
                      className="flex items-center"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: 0.7 + (index * 0.15),
                          type: "spring",
                          stiffness: 200
                        }}
                        className="text-brand-accent mr-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.span>
                      {text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-10"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link 
                  href={`/${locale}/paywall?section=free-test`}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-brand-primary bg-brand-light hover:bg-brand-accent/10 transition-colors shadow-md"
                >
                  <span>{t('hero.cta')}</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="ml-2"
                  >
                    <svg 
                      className="h-5 w-5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              {/* Abstract shape for visual interest */}
              <motion.div 
                animate={backgroundControls}
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 blur-xl transform"
              />
              
              {/* Device mockup with animations */}
              <motion.div 
                animate={tabletControls}
                className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl"
              >
                {/* Floating animation for the tablet */}
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut" 
                  }}
                  className="bg-gray-800 rounded-2xl p-4 shadow-inner"
                >
                  {/* Simulated SAT interface */}
                  <motion.div 
                    animate={interfaceControls}
                    className="bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <motion.div 
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "6rem", opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="h-3 bg-gray-200 rounded"
                      />
                      <motion.div 
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "3rem", opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="h-3 bg-blue-200 rounded"
                      />
                    </div>
                    <div className="space-y-3">
                      {[100, 83, 67].map((width, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: `${width}%`, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
                          className="h-4 bg-gray-100 rounded"
                        />
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="mt-6 space-y-2"
                    >
                      {[
                        { selected: false, width: "8rem" },
                        { selected: false, width: "6rem" },
                        { selected: true, width: "7rem" },
                        { selected: false, width: "9rem" }
                      ].map((option, i) => (
                        <motion.div
                          key={i}
                          initial={{ 
                            x: -20, 
                            opacity: 0,
                            backgroundColor: option.selected ? "#EBF5FF" : "#F3F4F6"
                          }}
                          animate={{ 
                            x: 0, 
                            opacity: 1,
                            backgroundColor: option.selected ? "#EBF5FF" : "#F3F4F6"
                          }}
                          whileHover={{ 
                            backgroundColor: option.selected ? "#EBF5FF" : "#F9FAFB"
                          }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.8 + (i * 0.15),
                            type: "spring"
                          }}
                          className={`h-8 w-full rounded flex items-center px-3 ${
                            option.selected ? "bg-blue-50 border border-blue-200" : "bg-gray-100"
                          }`}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              delay: 1.2 + (i * 0.15),
                              type: "spring",
                              stiffness: 200
                            }}
                            className={`h-3 w-3 ${
                              option.selected 
                                ? "bg-blue-500 rounded-full" 
                                : "bg-white border border-gray-300 rounded-full"
                            } mr-2`}
                          />
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: option.width }}
                            transition={{ duration: 0.4, delay: 1.0 + (i * 0.15) }}
                            className={`h-2 ${
                              option.selected ? "bg-blue-100" : "bg-gray-200"
                            } rounded`}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.6 }}
                      className="mt-6 flex justify-between"
                    >
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ duration: 0.4, delay: 1.7 }}
                        className="h-8 bg-gray-100 rounded"
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 1.8,
                          type: "spring",
                          stiffness: 120
                        }}
                        className="h-8 bg-blue-500 rounded"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Device buttons with press animation */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 space-y-2">
                  <motion.div
                    animate={buttonsControls}
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleX: 1.2, backgroundColor: "#4B5563" }}
                    className="h-10 w-1 bg-gray-700 rounded-full origin-center"
                  />
                  <motion.div
                    animate={buttonsControls}
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleX: 1.5, backgroundColor: "#4B5563" }}
                    whileTap={{ scaleY: 0.9 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="h-16 w-1 bg-gray-700 rounded-full origin-center"
                  />
                </div>
                
                {/* Subtle glare effect */}
                <motion.div
                  animate={glareControls}
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-15 pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}