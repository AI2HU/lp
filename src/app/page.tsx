"use client";

import { Nav } from "@/component/Nav";
import { PricingCalculator } from "@/component/PricingCalculator";
import { ContactForm } from "@/component/ContactForm";
import { ProcessSteps } from "@/component/ProcessSteps";
import { FaRocket, FaEuroSign, FaLock, FaSyncAlt, FaBolt, FaCheck, FaTimes } from "react-icons/fa";
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
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-accent bg-clip-text text-transparent transition-all duration-1000"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
              opacity: Math.max(0.8, 1 - scrollY * 0.0008)
            }}
          >
            Libérez votre code IA
          </h1>
          <p 
            className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-5xl mx-auto leading-relaxed transition-all duration-1000"
            style={{
              transform: `translateY(${scrollY * 0.03}px)`,
              opacity: Math.max(0.6, 1 - scrollY * 0.0006)
            }}
          >
            Éliminez définitivement les coûteux abonnements IA grâce à notre migration unique vers un code <span className="text-accent font-semibold">plus robuste</span>, <span className="text-accent font-semibold">facile à maintenir</span> et <span className="text-accent font-semibold">à mettre à jour</span>
          </p>
          <div 
            className="bg-white/80 backdrop-blur-sm border border-accent/20 p-6 max-w-2xl mx-auto mb-12 transition-all duration-1000"
            style={{
              transform: `translateY(${scrollY * 0.04}px)`,
              opacity: Math.max(0.5, 1 - scrollY * 0.0005)
            }}
          >
            <p className="text-lg sm:text-xl font-semibold text-accent">
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
              className="bg-accent text-white px-10 py-5 text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Découvrir A2H
            </button>
            <button 
              onClick={() => document.getElementById("pricing-calculator")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-accent text-accent px-10 py-5 text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Voir un exemple
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
              Avantages Exceptionnels
            </h2>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Votre investissement se transforme en économies substantielles
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto "></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 bg-white  shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 hover:-translate-y-2">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaEuroSign className="text-accent text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Économies spectaculaires</h3>
              <p className="text-gray-600 leading-relaxed">
                Éliminez définitivement les frais d&apos;abonnement IA. Notre migration unique est rentabilisée en seulement 5 mois.
              </p>
            </div>
            <div className="group text-center p-8 bg-white  shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 hover:-translate-y-2">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaLock className="text-accent text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Propriété intellectuelle totale</h3>
              <p className="text-gray-600 leading-relaxed">
                Obtenez 100% de contrôle sur votre code sans aucune dépendance continue ni restriction de licence.
              </p>
            </div>
            <div className="group text-center p-8 bg-white  shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 hover:-translate-y-2">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaSyncAlt className="text-accent text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Migration transparente</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre équipe d&apos;élite gère l&apos;ensemble de la transition sans interruption de service et avec un impact minimal sur vos opérations.
              </p>
            </div>
            <div className="group text-center p-8 bg-white  shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 hover:-translate-y-2">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaBolt className="text-accent text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Performance améliorée</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous ne nous contentons pas de convertir—nous optimisons. Attendez-vous à un code plus propre, des performances accrues et l&apos;élimination des bizarreries générées par l&apos;IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
              Comparer et Économiser
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto "></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Subscription Column */}
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200  p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTimes className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-rose-600">
                  Abonnement au service IA
                </h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-center text-rose-600">
                  <span className="text-2xl mr-4">✕</span>
                  <span className="text-lg">Paiements mensuels continus</span>
                </li>
                <li className="flex items-center text-rose-600">
                  <span className="text-2xl mr-4">✕</span>
                  <span className="text-lg">Verrouillé dans des systèmes propriétaires</span>
                </li>
                <li className="flex items-center text-rose-600">
                  <span className="text-2xl mr-4">✕</span>
                  <span className="text-lg">Options de personnalisation limitées</span>
                </li>
                <li className="flex items-center text-rose-600">
                  <span className="text-2xl mr-4">✕</span>
                  <span className="text-lg">Dépendance à un service tiers</span>
                </li>
              </ul>
            </div>

            {/* A2H Migration Column */}
            <div className="bg-gradient-to-br from-green-50 to-accent/10 border-2 border-accent  p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-white px-4 py-2 text-sm font-semibold ">
                VOUS GAGNEZ
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-accent">
                  Migration unique A2H
                </h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-center text-accent">
                  <span className="text-2xl mr-4">✓</span>
                  <span className="text-lg font-medium">Paiement unique, propriété à vie</span>
                </li>
                <li className="flex items-center text-accent">
                  <span className="text-2xl mr-4">✓</span>
                  <span className="text-lg font-medium">Propriété et contrôle total du code</span>
                </li>
                <li className="flex items-center text-accent">
                  <span className="text-2xl mr-4">✓</span>
                  <span className="text-lg font-medium">Potentiel de personnalisation illimité</span>
                </li>
                <li className="flex items-center text-accent">
                  <span className="text-2xl mr-4">✓</span>
                  <span className="text-lg font-medium">Déployez n&apos;importe où, sans verrouillage par le fournisseur</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section id="pricing-calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <PricingCalculator />
        </div>
      </section>

      <ProcessSteps />

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
              Demandez votre devis gratuit
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les 24 heures pour discuter de votre projet.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto "></div>
          </div>
          <div className="bg-white  shadow-2xl p-8 md:p-12 border border-gray-100">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/5 via-white to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm  p-12 shadow-2xl border border-accent/20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
              Prêt à vous libérer de la dépendance à l&apos;IA ?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Faites le premier pas vers une véritable propriété du code
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-accent text-white px-12 py-5  text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Commencer la migration
              </button>
              <button className="border-2 border-accent text-accent px-12 py-5  text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Consulter notre blog
              </button>
            </div>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Vous voulez voir un cas d&apos;utilisation réel d&apos;A2H en action ? Consultez notre article de blog pour un exemple détaillé.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-black to-accent text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">A2H</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Libérez votre code IA
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 A2H. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
