"use client";

import { Nav } from "@/component/Nav";
import { TokenPricingCalculator } from "@/component/TokenPricingCalculator";
import { ProcessSteps } from "@/component/ProcessSteps";
import { Footer } from "@/component/Footer";
import { HeroSection } from "@/component/HeroSection";
import { BenefitsSection } from "@/component/BenefitsSection";
import { AIServicesSection } from "@/component/AIServicesSection";
import { ComparisonSection } from "@/component/ComparisonSection";
import { ContactSection } from "@/component/ContactSection";
import { CTASection } from "@/component/CTASection";
import { CloudProvidersSection } from "@/component/CloudProvidersSection";
import { FAQ } from "@/component/FAQ";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white text-black">
        <HeroSection scrollY={scrollY} />
        <BenefitsSection />
        <AIServicesSection />
        <ComparisonSection />
        <CloudProvidersSection />

      {/* Pricing Calculator Section */}
      <section id="pricing-calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <TokenPricingCalculator />
        </div>
      </section>

      <ProcessSteps />
        <FAQ />
        <ContactSection />
        <CTASection />
      <Footer />
    </main>
    </>
  );
}
