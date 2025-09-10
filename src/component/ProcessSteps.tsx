"use client";

import { useState, useEffect } from "react";

export function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('process');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: 1,
      title: "Évaluation complète",
      subtext: "Analyse approfondie de votre code existant"
    },
    {
      number: 2,
      title: "Migration stratégique",
      subtext: "Stratégie personnalisée pour votre migration"
    },
    {
      number: 3,
      title: "Implémentation experte",
      subtext: "Exécution par nos experts développeurs"
    },
    {
      number: 4,
      title: "Transfert complet",
      subtext: "Livraison avec documentation complète"
    }
  ];

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
              Quatre étapes simples
            </h2>
            <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
              Optez pour l'indépendance complète du code
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-accent/50 mx-auto"></div>
          </div>
        </div>
        
        {/* Workflow Steps */}
        <div className="relative">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              
              return (
                <div
                  key={index}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(0)}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Main Circle with Number */}
                    <div className="relative z-10 mb-6">
                      {/* Main Circle with Number */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-br from-accent to-accent/80 shadow-2xl' 
                          : 'bg-gradient-to-br from-accent/90 to-accent/70'
                      }`}>
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent/40 to-accent/20 z-0"></div>
                    )}
                    
                    {/* Content Card */}
                    <div className={`bg-white p-5 shadow-lg border-2 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 h-32 flex flex-col justify-center ${
                      isActive 
                        ? 'border-accent shadow-xl scale-105' 
                        : 'border-gray-100 group-hover:border-accent/50'
                    }`}>
                      <h3 className={`text-lg font-bold mb-3 leading-loose transition-colors duration-300 ${
                        isActive ? 'text-accent' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h3>
                      
                      {/* Subtext on Hover */}
                      <div className={`text-xs text-accent font-medium transition-all duration-300 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}>
                        {step.subtext}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
