"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";

export function Nav() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  
  const getLocalizedPath = (path: string) => {
    const currentLang = i18n.language;
    if (currentLang === 'en') {
      return `/en${path}`;
    }
    return path;
  };
  
  const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/fr';
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuItems = useMemo(() => [
    { id: "benefits", label: t("nav.advantages") },
    { id: "comparison", label: t("nav.comparison") },
    { id: "pricing-calculator", label: t("nav.calculator") },
    { id: "process", label: t("nav.process") }
  ], [t]);

  const blogItem = { href: getLocalizedPath("/blog"), label: t("nav.blog") };
  const auditItem = { href: getLocalizedPath("/audit"), label: t("nav.audit") };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Find active section based on scroll position
      const sections = menuItems.map(item => document.getElementById(item.id)).filter(Boolean);
      let current = "";
      
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section.id;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  useEffect(() => {
    if (isHomePage && typeof globalThis !== 'undefined' && globalThis.location?.hash) {
      const hash = globalThis.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [isHomePage, pathname]);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const homePath = i18n.language === 'en' ? '/en' : '/';
      router.push(`${homePath}#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/10 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={i18n.language === 'en' ? '/en' : '/'} className="flex items-center">
              <Image
                src="/logo.png"
                alt="AI2H Logo"
                width={50}
                height={50}
                className="transition-all duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-accent font-bold bg-accent/10'
                      : 'text-accent hover:bg-accent/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                href={auditItem.href}
                className="px-4 py-2 text-sm font-medium transition-all duration-300 text-accent hover:bg-accent/5"
              >
                {auditItem.label}
              </Link>
            </div>
          </div>

          {/* Blog and Contact Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={blogItem.href}
              className="px-4 py-2 text-sm font-medium transition-all duration-300 text-accent hover:bg-accent/5"
            >
              {blogItem.label}
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-accent text-white hover:bg-accent/90"
            >
              {t("nav.contact")}
            </button>
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-all duration-300 text-accent hover:text-accent hover:bg-accent/10`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t transition-all duration-300 ${
              isScrolled 
                ? 'bg-white border-gray-200' 
                : 'bg-white/95 backdrop-blur-md border-white/30'
            }`}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-accent font-bold bg-accent/10'
                      : 'text-gray-700 hover:text-accent hover:bg-accent/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                href={blogItem.href}
                className="block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 text-gray-700 hover:text-accent hover:bg-accent/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {blogItem.label}
              </Link>
              <Link
                href={auditItem.href}
                className="block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 text-gray-700 hover:text-accent hover:bg-accent/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {auditItem.label}
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-accent text-white block px-3 py-2 text-base font-medium w-full text-left hover:bg-accent/90 transition-all duration-300 shadow-lg"
              >
                {t("nav.contact")}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
