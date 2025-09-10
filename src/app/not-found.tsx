"use client";

import Link from 'next/link'
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa'
import { Footer } from '@/component/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent/5 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Page introuvable
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
          </div>

          {/* Decorative Element */}
          <div className="mb-8">
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaHome className="mr-2" />
              Retour à l&apos;accueil
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaArrowLeft className="mr-2" />
              Page précédente
            </button>
          </div>

          {/* Help Text */}
          <div className="bg-white/80 backdrop-blur-sm border border-accent/20 p-6 shadow-lg mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaSearch className="text-accent text-2xl mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Besoin d&apos;aide ?
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, n&apos;hésitez pas à nous contacter. 
              Notre équipe vous aidera à trouver ce que vous cherchez.
            </p>
            <Link
              href="/#contact"
              className="inline-block mt-4 text-accent font-medium hover:text-accent/80 transition-colors duration-300"
            >
              Nous contacter →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer at bottom */}
      <Footer />
    </div>
  )
}
