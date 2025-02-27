'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../app/[locale]/providers';
import { motion, AnimatePresence } from 'framer-motion';
import { locales } from '../app/i18n';

// Items with implemented=false will redirect to paywall
const getNavItems = (t: any) => [
  { 
    name: t('navbar.home'), 
    path: '/',
    implemented: true
  },
  { 
    name: t('navbar.practice_tests'), 
    path: '/practice-tests',
    paywallSection: 'practice-tests',
    implemented: false,
    subItems: [
      { name: t('navbar.dsat_tests'), path: '/practice-tests/dsat', implemented: false, paywallSection: 'practice-tests' },
      { name: t('navbar.for_educators'), path: '/practice-tests/educators', implemented: false, paywallSection: 'practice-tests' }
    ]
  },
  { 
    name: t('navbar.sat_courses'), 
    path: '/courses',
    paywallSection: 'courses',
    implemented: false
  },
  { 
    name: t('navbar.about_us'), 
    path: '/about',
    paywallSection: 'about',
    implemented: false,
    subItems: [
      { name: t('navbar.who_we_are'), path: '/about/who-we-are', implemented: false, paywallSection: 'about' },
      { name: t('navbar.contact'), path: '/about/contact', implemented: false, paywallSection: 'about' }
    ]
  },
  { 
    name: t('navbar.blog'), 
    path: '/blog',
    paywallSection: 'blog',
    implemented: false
  }
];

const languageNames: Record<string, string> = {
  en: 'English',
  zh: '中文',
  hi: 'हिन्दी',
  ko: '한국어',
  es: 'Español',
  vi: 'Tiếng Việt'
};

export default function Navbar({ locale }: { locale: string }) {
  const { t, setLocale } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  // Create refs for the dropdown containers
  const navRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Add click outside event listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close dropdowns if clicked outside
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    
    // Add the event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const navItems = getNavItems(t);
  
  return (
    <nav className="bg-brand-light shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28">
          <div className="flex-shrink-0 flex items-center relative">
            <Link href={`/${locale}`}>
              {/* Single circular logo */}
              <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-[#63AEBF]/30 overflow-hidden relative p-2 absolute -top-2">
                {/* Gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-r from-[#0378A6] to-[#0889A6] opacity-10"></div>
                
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none"></div>
                
                {/* Logo image */}
                <Image 
                  src="https://thesatcrashcourse.com/wp-content/uploads/2024/01/the-sat-crash-course-logo.png" 
                  alt={t('hero.title')}
                  width={230} 
                  height={69} 
                  className="w-full h-auto object-contain scale-110" 
                  priority
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" ref={navRef}>
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <div 
                  className="flex items-center cursor-pointer text-brand-dark hover:text-brand-primary transition-colors"
                  onClick={() => item.subItems && toggleDropdown(item.name)}
                >
                  {item.implemented ? (
                    <Link href={`/${locale}${item.path}`}>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ) : (
                    <Link href={`/${locale}/paywall?section=${item.paywallSection}`}>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                  {item.subItems && (
                    <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
                
                {item.subItems && openDropdown === item.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-brand-light ring-1 ring-brand-accent/20 focus:outline-none z-10"
                  >
                    <div className="py-1">
                      {item.subItems.map((subItem) => (
                        <Link 
                          key={subItem.name}
                          href={subItem.implemented ? `/${locale}${subItem.path}` : `/${locale}/paywall?section=${subItem.paywallSection}`}
                          className="block px-4 py-2 text-sm text-brand-dark hover:bg-brand-accent/10"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
            
            {/* Language Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center text-brand-dark hover:text-brand-primary transition-colors font-medium"
              >
                {languageNames[locale]}
                <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-brand-light ring-1 ring-brand-accent/20 focus:outline-none z-10"
                  >
                    <div className="py-1">
                      {locales.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLocale(lang);
                            setLangDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            locale === lang ? 'bg-brand-accent/10 text-brand-primary' : 'text-brand-dark hover:bg-brand-accent/5'
                          }`}
                        >
                          {languageNames[lang]}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-dark hover:text-brand-primary hover:bg-brand-accent/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-brand-light border-t border-brand-accent/20"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div 
                    className="flex items-center justify-between px-4 py-2 text-base font-medium text-brand-dark hover:text-brand-primary hover:bg-brand-accent/10"
                    onClick={() => item.subItems && toggleDropdown(item.name)}
                  >
                    <Link 
                      href={item.implemented ? `/${locale}${item.path}` : `/${locale}/paywall?section=${item.paywallSection}`} 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <svg 
                        className={`ml-1 h-5 w-5 transform transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {item.subItems && openDropdown === item.name && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-8 bg-brand-accent/5"
                      >
                        {item.subItems.map((subItem) => (
                          <Link 
                            key={subItem.name}
                            href={subItem.implemented ? `/${locale}${subItem.path}` : `/${locale}/paywall?section=${subItem.paywallSection}`}
                            className="block px-4 py-2 text-base font-medium text-brand-dark hover:text-brand-primary"
                            onClick={() => {
                              setOpenDropdown(null);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-2 text-base font-medium text-brand-dark">
                <button 
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center text-brand-dark hover:text-brand-primary"
                >
                  <span>Language: {languageNames[locale]}</span>
                  <svg 
                    className={`ml-1 h-5 w-5 transform transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-2 space-y-1"
                    >
                      {locales.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLocale(lang);
                            setLangDropdownOpen(false);
                          }}
                          className={`block w-full text-left py-2 text-sm ${
                            locale === lang ? 'text-brand-primary font-medium' : 'text-brand-dark'
                          }`}
                        >
                          {languageNames[lang]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}