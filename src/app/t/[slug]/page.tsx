"use client";

import { PricingCalculator } from "@/component/PricingCalculator";
import { ProcessSteps } from "@/component/ProcessSteps";
import { BenefitsSection } from "@/component/BenefitsSection";
import { AIServicesSection } from "@/component/AIServicesSection";
import { ComparisonSection } from "@/component/ComparisonSection";
import { ContactSection } from "@/component/ContactSection";
import { CloudProvidersSection } from "@/component/CloudProvidersSection";
import { useState, useEffect, use } from "react";
import Link from "next/link";

// Define keyword configurations
const keywordConfigs: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  "vibe-code": {
    heroTitle: "Libérez votre vibe code",
    heroSubtitle: "Migration IA vers code humain",
    heroDescription: "Éliminez définitivement les coûteux abonnements IA grâce à notre migration unique vers un code plus robuste, facile à maintenir et à mettre à jour",
    ctaTitle: "Gagnez du temps et de l'argent",
    ctaDescription: "Faites le premier pas vers une véritable propriété du code",
    metaTitle: "Migration IA vers code humain - A2H",
    metaDescription: "Libérez votre code IA des abonnements coûteux. Migration unique vers un code humain robuste et maintenable."
  },
  "code-ia-trop-cher": {
    heroTitle: "L'IA coûte trop cher ?",
    heroSubtitle: "Arrêtez de payer l'IA à vie",
    heroDescription: "Les abonnements IA deviennent un gouffre financier. Notre migration unique vous libère définitivement de ces coûts récurrents en transformant votre code IA en code humain que vous possédez entièrement.",
    ctaTitle: "Économisez des milliers d'euros",
    ctaDescription: "Récupérez votre indépendance financière et technique",
    metaTitle: "L'IA coûte trop cher ? Migration vers code humain - A2H",
    metaDescription: "Les abonnements IA sont trop chers ? Migrez vers un code humain que vous possédez. Économisez des milliers d'euros par an avec A2H."
  },
  "code-ia-bloque": {
    heroTitle: "Votre code IA vous bloque ?",
    heroSubtitle: "Reprenez le contrôle de votre code",
    heroDescription: "Vous êtes prisonnier de votre code généré par l'IA ? Reprenez le contrôle total avec notre migration qui transforme votre code IA en code humain que vous maîtrisez et pouvez modifier librement.",
    ctaTitle: "Reprenez le contrôle maintenant",
    ctaDescription: "Libérez-vous des contraintes du code IA",
    metaTitle: "Code IA bloqué ? Reprenez le contrôle - A2H",
    metaDescription: "Votre code IA vous bloque ? Reprenez le contrôle avec A2H. Migration vers un code humain que vous maîtrisez entièrement."
  }
};

interface TargetPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function TargetPage({ params }: TargetPageProps) {
  const resolvedParams = use(params);
  const [scrollY, setScrollY] = useState(0);
  const [config, setConfig] = useState(keywordConfigs["vibe-code"]); // Default fallback

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set configuration based on slug
    const keywordConfig = keywordConfigs[resolvedParams.slug];
    if (keywordConfig) {
      setConfig(keywordConfig);
      // Update page title and meta description
      document.title = keywordConfig.metaTitle;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', keywordConfig.metaDescription);
      }
    }
  }, [resolvedParams.slug]);

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
        >
          {config.heroTitle}
        </h1>
        <p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.03}px)`,
            opacity: Math.max(0.6, 1 - scrollY * 0.0006)
          }}
        >
          {config.heroDescription}
        </p>
        <div 
          className="bg-white/80 backdrop-blur-sm border border-accent/20 p-4 sm:p-6 max-w-2xl mx-auto mb-8 sm:mb-12 transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.04}px)`,
            opacity: Math.max(0.5, 1 - scrollY * 0.0005)
          }}
        >
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-accent">
            Maximisez votre ROI et prenez le contrôle total de votre technologie
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
            Découvrir A2H
          </button>
          <button 
            onClick={() => document.getElementById("pricing-calculator")?.scrollIntoView({ behavior: "smooth" })}
            className="border-2 border-accent text-accent px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Voir une estimation
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            {config.ctaTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {config.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-accent text-white px-12 py-5  text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Commencer la migration
            </button>
            <button 
              onClick={() => window.location.href = '/blog'}
              className="border-2 border-accent text-accent px-12 py-5  text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Consulter notre blog
            </button>
          </div>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Vous voulez voir un cas d&apos;utilisation réel d&apos;A2H en action ?<br/>
            <Link 
              href="/blog/reprendre-main-code-lovable-prototype-controle-total"
              className="text-accent hover:text-accent/80 underline font-medium transition-colors duration-200"
            >
              Consultez notre article de blog
            </Link> pour un exemple détaillé.
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
      <section id="pricing-calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <PricingCalculator />
        </div>
      </section>

      <ProcessSteps />
      <ContactSection />
      <CustomCTASection />
    </>
  );
}
