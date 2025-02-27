'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../app/[locale]/providers';
import { motion, AnimatePresence } from 'framer-motion';
import { locales } from '../app/i18n';

const getNavItems = (t: any) => [
  { 
    name: t('navbar.home'), 
    path: '/' 
  },
  { 
    name: t('navbar.practice_tests'), 
    path: '/practice-tests',
    subItems: [
      { name: t('navbar.dsat_tests'), path: '/practice-tests/dsat' },
      { name: t('navbar.for_educators'), path: '/practice-tests/educators' }
    ]
  },
  { 
    name: t('navbar.sat_courses'), 
    path: '/courses' 
  },
  { 
    name: t('navbar.about_us'), 
    path: '/about',
    subItems: [
      { name: t('navbar.who_we_are'), path: '/about/who-we-are' },
      { name: t('navbar.contact'), path: '/about/contact' }
    ]
  },
  { 
    name: t('navbar.blog'), 
    path: '/blog' 
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

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const navItems = getNavItems(t);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28">
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${locale}`}>
              <Image 
                src="https://thesatcrashcourse.com/wp-content/uploads/2024/01/the-sat-crash-course-logo.png" 
                alt={t('hero.title')}
                width={350} 
                height={105} 
                className="h-20 w-auto" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <div 
                  className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => item.subItems && toggleDropdown(item.name)}
                >
                  <span className="font-medium">{item.name}</span>
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
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  >
                    <div className="py-1">
                      {item.subItems.map((subItem) => (
                        <Link 
                          key={subItem.name}
                          href={`/${locale}${subItem.path}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
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
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
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
                            locale === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
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
            className="md:hidden bg-white border-t"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div 
                    className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => item.subItems && toggleDropdown(item.name)}
                  >
                    <Link href={`/${locale}${item.path}`} onClick={() => setMobileMenuOpen(false)}>
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
                        className="pl-8 bg-gray-50"
                      >
                        {item.subItems.map((subItem) => (
                          <Link 
                            key={subItem.name}
                            href={`/${locale}${subItem.path}`}
                            className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
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
              <div className="px-4 py-2 text-base font-medium text-gray-700">
                <button 
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600"
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
                            locale === lang ? 'text-blue-600 font-medium' : 'text-gray-700'
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