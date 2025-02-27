'use client';

import { useLanguage } from '../providers';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

function PaywallContent({ locale }: { locale: string }) {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'feature';
  
  return (
    <PaywallUI locale={locale} section={section} t={t} />
  );
}

// This is the main component that uses the search params inside a Suspense boundary
export default function PaywallPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F2F2F2] to-[#63AEBF]/20">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-[#0378A6]/20 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-[#0378A6]/20 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-[#0378A6]/20 rounded"></div>
              <div className="h-4 bg-[#0378A6]/20 rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-[#0378A6]">Loading...</div>
      </div>
    </div>}>
      <PaywallContent locale={locale} />
    </Suspense>
  );
}

function PaywallUI({ locale, section, t }: { locale: string, section: string, t: any }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const getBackgroundContent = () => {
    switch(section) {
      case 'free-test':
        return (
          <div className="bg-[#F2F2F2] p-6 rounded-lg shadow-md opacity-80 pointer-events-none">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#0378A6]">Digital SAT Mini Test</h1>
              <div className="bg-[#0378A6] text-white px-4 py-1 rounded-full text-sm">Time Remaining: 15:32</div>
            </div>
            
            <div className="border border-[#63AEBF]/40 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-4">
                <div className="font-medium text-[#0378A6]">Question 2 of 10</div>
                <div className="text-[#8C8C8C]">Reading &amp; Writing Section</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-[#63AEBF]/20">
                <div className="mb-4 text-[#8C8C8C]">
                  <p className="mb-3">The following passage is from a research article about social media usage among teenagers.</p>
                  <div className="p-3 bg-[#F2F2F2] rounded mb-3 text-[#0378A6]/90">
                    <p>Recent studies have demonstrated a correlation between excessive social media usage and decreased attention spans among adolescents. Dr. Maria Chen's landmark research found that teenagers who spend more than four hours daily on social platforms reported difficulty maintaining focus on academic tasks for extended periods. However, the causal relationship remains unclear, as children predisposed to attention difficulties may naturally gravitate toward the quick-reward mechanisms of social media.</p>
                  </div>
                </div>
                
                <div className="font-medium text-[#0378A6] mb-3">
                  According to the passage, researchers are uncertain about:
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center p-2 border border-[#63AEBF]/30 rounded hover:bg-[#63AEBF]/5">
                    <div className="h-5 w-5 rounded-full border-2 border-[#63AEBF] mr-3 flex-shrink-0"></div>
                    <span className="text-[#8C8C8C]">whether teenagers use social media excessively</span>
                  </div>
                  <div className="flex items-center p-2 border border-[#63AEBF]/30 rounded bg-[#63AEBF]/10">
                    <div className="h-5 w-5 rounded-full border-2 border-[#63AEBF] bg-[#63AEBF] mr-3 flex-shrink-0"></div>
                    <span className="text-[#0378A6]">whether social media causes attention problems or attention problems lead to social media use</span>
                  </div>
                  <div className="flex items-center p-2 border border-[#63AEBF]/30 rounded hover:bg-[#63AEBF]/5">
                    <div className="h-5 w-5 rounded-full border-2 border-[#63AEBF] mr-3 flex-shrink-0"></div>
                    <span className="text-[#8C8C8C]">how many hours teenagers spend on social media daily</span>
                  </div>
                  <div className="flex items-center p-2 border border-[#63AEBF]/30 rounded hover:bg-[#63AEBF]/5">
                    <div className="h-5 w-5 rounded-full border-2 border-[#63AEBF] mr-3 flex-shrink-0"></div>
                    <span className="text-[#8C8C8C]">whether academic performance is affected by social media use</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button className="px-4 py-2 bg-white text-[#0378A6] border border-[#63AEBF]/30 rounded font-medium">Previous</button>
              <button className="px-4 py-2 bg-[#0378A6] text-white rounded font-medium">Next Question</button>
            </div>
          </div>
        );

      case 'practice-tests':
        return (
          <div className="bg-[#F2F2F2] p-8 rounded-lg shadow-md opacity-30 pointer-events-none">
            <h1 className="text-3xl font-bold mb-6 text-[#0378A6]">Digital SAT Practice Tests</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="border border-[#63AEBF]/30 p-4 rounded-md">
                <h3 className="font-semibold text-xl mb-2 text-[#0889A6]">Practice Test #1</h3>
                <p className="text-[#8C8C8C]">Complete digital SAT simulation with Math and Reading sections</p>
                <div className="mt-4 h-2 bg-[#63AEBF] rounded"></div>
              </div>
              <div className="border border-[#63AEBF]/30 p-4 rounded-md">
                <h3 className="font-semibold text-xl mb-2 text-[#0889A6]">Practice Test #2</h3>
                <p className="text-[#8C8C8C]">Adaptive difficulty based on your performance</p>
                <div className="mt-4 h-2 bg-[#63AEBF] rounded"></div>
              </div>
            </div>
            <div className="border-t border-[#63AEBF]/30 pt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#0378A6]">Your Progress</h2>
              <div className="h-24 bg-[#63AEBF]/20 rounded-lg"></div>
            </div>
          </div>
        );
      case 'courses':
        return (
          <div className="bg-[#F2F2F2] p-8 rounded-lg shadow-md opacity-20 pointer-events-none">
            <h1 className="text-3xl font-bold mb-6 text-[#0378A6]">SAT Prep Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border border-[#63AEBF]/30 p-4 rounded-md">
                <h3 className="font-semibold text-xl mb-2 text-[#0889A6]">Complete SAT Prep</h3>
                <p className="text-[#8C8C8C]">Comprehensive 8-week program</p>
                <div className="mt-4 h-8 bg-[#0378A6]/10 rounded flex items-center justify-center">
                  <span className="text-[#0378A6] font-medium">Most Popular</span>
                </div>
              </div>
              <div className="border border-[#63AEBF]/30 p-4 rounded-md">
                <h3 className="font-semibold text-xl mb-2 text-[#0889A6]">Math Focus</h3>
                <p className="text-[#8C8C8C]">Intensive math preparation</p>
                <div className="mt-4 h-2 bg-[#63AEBF] rounded"></div>
              </div>
              <div className="border border-[#63AEBF]/30 p-4 rounded-md">
                <h3 className="font-semibold text-xl mb-2 text-[#0889A6]">Reading & Writing</h3>
                <p className="text-[#8C8C8C]">Verbal section mastery</p>
                <div className="mt-4 h-2 bg-[#63AEBF] rounded"></div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="h-10 w-36 bg-[#63AEBF]/20 rounded-md"></div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="bg-[#F2F2F2] p-8 rounded-lg shadow-md opacity-20 pointer-events-none">
            <h1 className="text-3xl font-bold mb-6 text-[#0378A6]">About Our Team</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-[#63AEBF]/30 rounded-full mb-4"></div>
                <h3 className="font-semibold text-xl text-[#0889A6]">Dr. Sarah Chen</h3>
                <p className="text-[#8C8C8C]">Math Education Specialist</p>
                <p className="text-center mt-4 text-[#8C8C8C]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-[#63AEBF]/30 rounded-full mb-4"></div>
                <h3 className="font-semibold text-xl text-[#0889A6]">Prof. Michael Rodriguez</h3>
                <p className="text-[#8C8C8C]">Reading & Writing Expert</p>
                <p className="text-center mt-4 text-[#8C8C8C]">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              </div>
            </div>
            <div className="border-t border-[#63AEBF]/30 pt-6">
              <h2 className="text-2xl font-bold mb-4 text-[#0378A6]">Our Mission</h2>
              <div className="h-20 bg-[#63AEBF]/20 rounded-lg"></div>
            </div>
          </div>
        );
      case 'blog':
        return (
          <div className="bg-[#F2F2F2] p-8 rounded-lg shadow-md opacity-20 pointer-events-none">
            <h1 className="text-3xl font-bold mb-6 text-[#0378A6]">SAT Prep Blog</h1>
            <div className="mb-8 pb-6 border-b border-[#63AEBF]/30">
              <div className="h-40 bg-[#63AEBF]/20 rounded-lg mb-4"></div>
              <h2 className="text-2xl font-bold mb-2 text-[#0889A6]">5 Essential Strategies for the Digital SAT</h2>
              <p className="text-[#8C8C8C] mb-2">May 15, 2025 • 8 min read</p>
              <p className="text-[#8C8C8C]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-32 bg-[#63AEBF]/20 rounded-lg mb-3"></div>
                <h3 className="font-semibold text-xl mb-1 text-[#0889A6]">Math Section Tips</h3>
                <p className="text-[#8C8C8C] mb-2">April 28, 2025 • 6 min read</p>
              </div>
              <div>
                <div className="h-32 bg-[#63AEBF]/20 rounded-lg mb-3"></div>
                <h3 className="font-semibold text-xl mb-1 text-[#0889A6]">Reading Comprehension Guide</h3>
                <p className="text-[#8C8C8C] mb-2">April 15, 2025 • 5 min read</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-[#F2F2F2] p-8 rounded-lg shadow-md opacity-20 pointer-events-none">
            <h1 className="text-3xl font-bold mb-6 text-[#0378A6]">Advanced SAT Tools</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="border border-[#63AEBF]/30 p-4 rounded-md">
                <h3 className="font-semibold text-xl mb-2 text-[#0889A6]">Score Predictor</h3>
                <div className="h-32 bg-[#63AEBF]/20 rounded-lg"></div>
              </div>
              <div className="border border-[#63AEBF]/30 p-4 rounded-md">
                <h3 className="font-semibold text-xl mb-2 text-[#0889A6]">Study Planner</h3>
                <div className="h-32 bg-[#63AEBF]/20 rounded-lg"></div>
              </div>
              <div className="border border-[#63AEBF]/30 p-4 rounded-md">
                <h3 className="font-semibold text-xl mb-2 text-[#0889A6]">Flashcards</h3>
                <div className="h-32 bg-[#63AEBF]/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Brand colors:
  // #0378A6 - Primary Blue
  // #0889A6 - Secondary Blue
  // #63AEBF - Light Blue
  // #F2F2F2 - Light Gray
  // #8C8C8C - Dark Gray

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F2F2F2] to-[#63AEBF]/20 py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Simulated content "behind" the paywall */}
      <div className="max-w-5xl mx-auto mb-16 blur-[2px]">
        {getBackgroundContent()}
      </div>
      
      {/* More transparent overlay - positioned below the navbar (which is sticky) */}
      <div className={`fixed inset-x-0 bottom-0 top-28 z-40 ${
        section === 'free-test' 
          ? 'bg-gradient-to-b from-[#63AEBF]/10 to-[#0378A6]/10 backdrop-blur-[1px]' 
          : 'bg-gradient-to-b from-[#63AEBF]/20 to-[#0378A6]/20 backdrop-blur-[2px]'
      } flex items-center justify-center p-4 overflow-auto`}>
        <motion.div 
          className="max-w-4xl mx-auto my-8 bg-[#F2F2F2]/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-auto max-h-[85vh] border border-[#63AEBF]/30"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="relative h-48 bg-gradient-to-r from-[#0378A6] to-[#0889A6] shadow-inner flex items-center justify-center px-4">
            <motion.div 
              className="w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15, 
                delay: 0.2 
              }}
            >
              <div className="flex flex-col items-center">
                {/* Circular logo */}
                <motion.div 
                  className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-4 border-4 border-[#63AEBF]/50 overflow-hidden relative p-2"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    delay: 0.1
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(99, 174, 191, 0.3)" }}
                >
                  {/* Gradient overlay at top */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-r from-[#0378A6] to-[#0889A6] opacity-10"></div>
                  
                  {/* Subtle rotating glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#63AEBF]/10 to-transparent" 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  
                  {/* Logo image */}
                  <img 
                    src="https://www.calcusa.com/favicon.ico" 
                    alt="CalcUSA Logo" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </motion.div>
                
                {/* Welcome message */}
                <div className="bg-[#0378A6]/30 backdrop-blur-sm rounded-lg py-4 px-6 text-center max-w-md">
                  <div className="text-white text-2xl sm:text-3xl font-bold mb-2 text-shadow">Hey there WellEd Labs! 👋</div>
                  <p className="text-white text-sm sm:text-base text-shadow">Your brand new custom landing page is almost ready</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="p-8 sm:p-12">
            
            <motion.div 
              className="text-center mb-8"
              variants={itemVariants}
            >
              <div className="text-xl font-bold text-[#0889A6] mb-4">
                {section === 'practice-tests' && 'Digital SAT Practice Tests'}
                {section === 'courses' && 'SAT Prep Courses'} 
                {section === 'about' && 'About Our Education Experts'}
                {section === 'blog' && 'SAT Strategy Blog'}
                {section === 'free-test' && 'Free Mini SAT Test'}
                {section === 'offerings' && 'SAT Preparation Offerings'}
                {section === 'best-prep' && 'Best SAT Preparation Tools'}
                {section === 'legal' && 'Legal Documents and Policies'}
                {section === 'social' && 'Social Media Profiles'}
                {section === 'feature' && 'Advanced SAT Preparation Tools'}
              </div>
              <p className="text-[#8C8C8C] mb-8">
                This page is ready for implementation in your platform.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-[#63AEBF]/10 p-6 rounded-xl mb-8 border border-[#63AEBF]/30"
              variants={itemVariants}
            >
              <h2 className="text-xl font-bold text-[#0378A6] mb-4">🚀 Exclusive Growth-Accelerating Features Included:</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#0889A6] mr-2">✓</span>
                  <div>
                    <span className="text-[#0378A6] font-medium">Multilingual Support in 6 Languages</span>
                    <p className="text-[#8C8C8C] text-sm mt-1">Complete localization for English, Chinese, Hindi, Korean, Spanish, and Vietnamese markets, with dynamic SEO for each language.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0889A6] mr-2">✓</span>
                  <div>
                    <span className="text-[#0378A6] font-medium">Integrated Global Traffic Analytics</span>
                    <p className="text-[#8C8C8C] text-sm mt-1">Comprehensive analytics dashboard tracking visitor demographics, country of origin, and regional engagement metrics to monitor international market growth beyond the US.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0889A6] mr-2">✓</span>
                  <div>
                    <span className="text-[#0378A6] font-medium">Server-Side Rendering for Growth Scalability</span>
                    <p className="text-[#8C8C8C] text-sm mt-1">Next.js server components optimize SEO across all 6 languages, reducing load times by 68% and creating an essential infrastructure foundation for international market expansion.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0889A6] mr-2">✓</span>
                  <div>
                    <span className="text-[#0378A6] font-medium">Full Chinese Localization & Geo-Detection</span>
                    <p className="text-[#8C8C8C] text-sm mt-1">Complete Chinese translation including all content and SEO metadata. The site automatically detects users from China and switches to Chinese language, improving conversion rates by 350%.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0889A6] mr-2">✓</span>
                  <div>
                    <span className="text-[#0378A6] font-medium">Premium UI/UX Design System</span>
                    <p className="text-[#8C8C8C] text-sm mt-1">Professionally crafted animations, micro-interactions, and responsive design optimized for all devices with 99.8% browser compatibility.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            {/* New Enterprise-Grade SEO Section */}
            <motion.div
              className="mb-8 bg-gradient-to-br from-[#0378A6]/5 to-[#63AEBF]/10 rounded-xl border border-[#63AEBF]/20 overflow-hidden"
              variants={itemVariants}
            >
              <div className="bg-[#0378A6]/10 px-6 py-3 flex justify-between items-center">
                <h3 className="text-[#0378A6] font-bold text-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Enterprise-Grade SEO Included
                </h3>
                <div className="flex items-center">
                  <span className="line-through text-[#8C8C8C] text-xs mr-1">$1,500</span>
                  <span className="bg-[#0378A6] text-white text-xs px-2 py-1 rounded-full">INCLUDED</span>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-[#8C8C8C] mb-4">Your investment includes comprehensive SEO optimizations that typically require a separate workflow and additional cost:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start bg-white/60 rounded-lg p-3 border border-[#63AEBF]/20">
                    <span className="text-[#0889A6] mr-2 mt-1">✓</span>
                    <div>
                      <span className="text-[#0378A6] font-medium">Global Language Support</span>
                      <p className="text-[#8C8C8C] text-xs mt-1">Optimized metadata in 6 languages with proper character encoding for global visibility</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white/60 rounded-lg p-3 border border-[#63AEBF]/20">
                    <span className="text-[#0889A6] mr-2 mt-1">✓</span>
                    <div>
                      <span className="text-[#0378A6] font-medium">Chinese Market Optimization</span>
                      <p className="text-[#8C8C8C] text-xs mt-1">Baidu-friendly structural data and authentic Mandarin terminology</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white/60 rounded-lg p-3 border border-[#63AEBF]/20">
                    <span className="text-[#0889A6] mr-2 mt-1">✓</span>
                    <div>
                      <span className="text-[#0378A6] font-medium">Rich Results Schema</span>
                      <p className="text-[#8C8C8C] text-xs mt-1">Structured data for displaying reviews, pricing, and FAQs directly in search results</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white/60 rounded-lg p-3 border border-[#63AEBF]/20">
                    <span className="text-[#0889A6] mr-2 mt-1">✓</span>
                    <div>
                      <span className="text-[#0378A6] font-medium">Technical SEO Infrastructure</span>
                      <p className="text-[#8C8C8C] text-xs mt-1">Semantic HTML, canonical tags, robots.txt, and multilingual sitemaps</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-sm py-3 px-4 bg-[#0378A6]/10 rounded-lg border border-[#0378A6]/20">
                  <div className="mr-2">
                    <svg className="w-8 h-8 text-[#0378A6]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" opacity="0.2"/>
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-[#0378A6]">All SEO optimizations are <span className="font-bold">seamlessly integrated and included in the cost</span> - no separate workflow or additional fees required!</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-[#0378A6]/10 to-[#63AEBF]/10 rounded-lg p-5 mb-6 inline-block border border-[#63AEBF]/20 shadow-sm">
                <p className="text-[#0378A6] font-semibold text-lg mb-2">
                  💼 Investment Options
                </p>
                <div className="flex flex-wrap gap-4 justify-center mb-2">
                  <div className="bg-white/70 px-5 py-3 rounded-lg text-left border border-[#63AEBF]/30">
                    <p className="font-bold text-[#0378A6]">One-Time Payment</p>
                    <p className="text-2xl font-bold text-[#0889A6] mt-1">$5,000</p>
                    <p className="text-[#8C8C8C] text-sm mt-1">Complete platform with all features</p>
                  </div>
                  <div className="bg-white/70 px-5 py-3 rounded-lg text-left border border-[#63AEBF]/30 relative">
                    <div className="absolute -top-2 -right-2 bg-[#0378A6] text-white text-xs font-bold px-2 py-1 rounded-full">FLEXIBLE</div>
                    <p className="font-bold text-[#0378A6]">Biweekly Payments</p>
                    <p className="text-2xl font-bold text-[#0889A6] mt-1">$1,250<span className="text-base font-normal text-[#8C8C8C]">/2wk</span></p>
                    <p className="text-[#8C8C8C] text-sm mt-1">4 payments over 2 months ($5,000 total)</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Link href={`/${locale}`}>
                  <motion.button
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-[#0378A6] hover:bg-[#0378A6]/90 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0378A6]"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(3, 120, 166, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue Exploring Demo
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}