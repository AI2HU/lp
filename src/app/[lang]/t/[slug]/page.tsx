"use client";

import { TokenPricingCalculator } from "@/component/TokenPricingCalculator";
import { ProcessSteps } from "@/component/ProcessSteps";
import { BenefitsSection } from "@/component/BenefitsSection";
import { AIServicesSection } from "@/component/AIServicesSection";
import { ComparisonSection } from "@/component/ComparisonSection";
import { ContactSection } from "@/component/ContactSection";
import { CloudProvidersSection } from "@/component/CloudProvidersSection";
import { FAQ } from "@/component/FAQ";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";


interface TargetPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default function TargetPage({ params }: TargetPageProps) {
  const resolvedParams = use(params);
  const { t, i18n } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [config, setConfig] = useState<{
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    ctaTitle: string;
    ctaDescription: string;
    metaTitle: string;
    metaDescription: string;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set configuration based on slug using translations
    const slug = resolvedParams.slug;
    const translationKey = `targetPages.${slug}`;
    
    // Check if translation exists
    const heroTitle = t(`${translationKey}.heroTitle`, { defaultValue: "" });
    if (heroTitle) {
      const keywordConfig = {
        heroTitle: t(`${translationKey}.heroTitle`),
        heroSubtitle: t(`${translationKey}.heroSubtitle`),
        heroDescription: t(`${translationKey}.heroDescription`),
        ctaTitle: t(`${translationKey}.ctaTitle`),
        ctaDescription: t(`${translationKey}.ctaDescription`),
        metaTitle: t(`${translationKey}.metaTitle`),
        metaDescription: t(`${translationKey}.metaDescription`)
      };
      
      setConfig(keywordConfig);
      // Update page title and meta description
      document.title = keywordConfig.metaTitle;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', keywordConfig.metaDescription);
      }
    }
  }, [resolvedParams.slug, i18n.language, t]);

  // Custom HeroSection with dynamic content
  const CustomHeroSection = () => (
    <section 
      id="hero" 
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `linear-gradient(${135 + scrollY * 0.1}deg, 
          rgba(249, 250, 251, ${1 - scrollY * 0.002}) 0%, 
          rgba(255, 255, 255, ${1 - scrollY * 0.001}) 50%, 
          rgba(93, 56, 145, ${0.05 + scrollY * 0.0005}) 100%)`
      }}
    >
      {/* Dynamic Background Elements */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${50 + scrollY * 0.1}% ${30 + scrollY * 0.05}%, 
            rgba(93, 56, 145, ${0.1 - scrollY * 0.0001}) 0%, 
            transparent 50%), 
            radial-gradient(circle at ${80 - scrollY * 0.1}% ${70 - scrollY * 0.05}%, 
            rgba(93, 56, 145, ${0.05 - scrollY * 0.00005}) 0%, 
            transparent 50%)`
        }}
      />
      
      {/* Animated Decorative Elements */}
      <div 
        className="absolute top-20 left-10 w-20 h-20 bg-accent/10 blur-xl transition-all duration-1000"
        style={{
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) scale(${1 + scrollY * 0.0001})`,
          opacity: Math.max(0.3, 1 - scrollY * 0.002)
        }}
      />
      <div 
        className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 blur-2xl transition-all duration-1000"
        style={{
          transform: `translate(${-scrollY * 0.05}px, ${-scrollY * 0.1}px) scale(${1 + scrollY * 0.0002})`,
          opacity: Math.max(0.2, 1 - scrollY * 0.001)
        }}
      />
      
      {/* Additional floating elements */}
      <div 
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/5 blur-lg transition-all duration-1000"
        style={{
          transform: `translate(${scrollY * 0.08}px, ${scrollY * 0.03}px) rotate(${scrollY * 0.1}deg)`,
          opacity: Math.max(0.1, 0.8 - scrollY * 0.001)
        }}
      />
      <div 
        className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-accent/8 blur-md transition-all duration-1000"
        style={{
          transform: `translate(${-scrollY * 0.06}px, ${scrollY * 0.08}px) rotate(${-scrollY * 0.15}deg)`,
          opacity: Math.max(0.1, 0.6 - scrollY * 0.001)
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {config && (
          <>
        <div 
          className="inline-flex bg-accent/10 text-accent px-4 py-2 text-sm font-semibold mb-8 items-center gap-2 transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.02}px)`,
            opacity: Math.max(0.7, 1 - scrollY * 0.001)
          }}
        >
          <span className="text-accent">🚀</span>
          {config.heroSubtitle}
        </div>
        <h1 
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-accent bg-clip-text text-transparent transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
            opacity: Math.max(0.8, 1 - scrollY * 0.0008),
            lineHeight: '1.1'
          }}
          dangerouslySetInnerHTML={{ __html: config.heroTitle }}
        />
        <p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.03}px)`,
            opacity: Math.max(0.6, 1 - scrollY * 0.0006)
          }}
        >
          {config.heroDescription}
        </p>
          </>
        )}
        <div 
          className="bg-white/80 backdrop-blur-sm border border-accent/20 p-4 sm:p-6 max-w-2xl mx-auto mb-8 sm:mb-12 transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.04}px)`,
            opacity: Math.max(0.5, 1 - scrollY * 0.0005)
          }}
        >
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-accent">
            {t("hero.highlight")}
          </p>
        </div>
        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            opacity: Math.max(0.4, 1 - scrollY * 0.0004)
          }}
        >
          <button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-accent text-white px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t("hero.ctaDiscover")}
          </button>
          <button 
            onClick={() => window.open('https://calendly.com/jonathan-ai2h/30min', '_blank')}
            className="border-2 border-accent text-accent px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t("hero.ctaDebug")}
          </button>
        </div>
      </div>
    </section>
  );

  // Custom CTASection with dynamic content
  const CustomCTASection = () => (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/5 via-white to-accent/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm  p-12 shadow-2xl border border-accent/20">
          {config && (
            <>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            {config.ctaTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {config.ctaDescription}
          </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-accent text-white px-12 py-5  text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("cta.startMigration")}
            </button>
            <button 
              onClick={() => window.location.href = '/blog'}
              className="border-2 border-accent text-accent px-12 py-5  text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("cta.blogButton")}
            </button>
          </div>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            {t("cta.blogText")}<br/>
            <Link 
              href="/blog/reprendre-main-code-lovable-prototype-controle-total"
              className="text-accent hover:text-accent/80 underline font-medium transition-colors duration-200"
            >
              {t("cta.blogLink")}
            </Link> {t("cta.blogRest")}
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <CustomHeroSection />
      <BenefitsSection />
      <AIServicesSection />
      <ComparisonSection />
      <CloudProvidersSection />
      
      {/* Pricing Calculator Section */}
      {resolvedParams.slug !== "reassurance-production-vibe-code" && (
      <section id="pricing-calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <TokenPricingCalculator />
        </div>
      </section>
      )}

      <ProcessSteps />
      <FAQ />
      <ContactSection />
      <CustomCTASection />
    </>
  );
}
