"use client";

import { FaRocket } from "react-icons/fa";

interface HeroSectionProps {
  scrollY: number;
}

export function HeroSection({ scrollY }: HeroSectionProps) {
  return (
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
          <FaRocket className="text-accent" />
          Migration IA vers Code Humain
        </div>
        <h1 
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-accent bg-clip-text text-transparent transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
            opacity: Math.max(0.8, 1 - scrollY * 0.0008),
            lineHeight: '1.1'
          }}
        >
          Libérez votre code IA
        </h1>
        <p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed transition-all duration-1000"
          style={{
            transform: `translateY(${scrollY * 0.03}px)`,
            opacity: Math.max(0.6, 1 - scrollY * 0.0006)
          }}
        >
          Éliminez définitivement les coûteux abonnements IA grâce à notre migration unique vers un code <span className="text-accent font-semibold">plus robuste</span>, <span className="text-accent font-semibold">facile à maintenir</span> et <span className="text-accent font-semibold">à mettre à jour</span>
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
}
