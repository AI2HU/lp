"use client";

import Link from 'next/link'
import { Footer } from '@/component/Footer'
import { useTranslation } from 'react-i18next'

export default function ManifestePage({ params }: { params: Promise<{ lang: string }> }) {
  const { t, i18n } = useTranslation();
  
  const getLocalizedPath = (path: string) => {
    return i18n.language === 'en' ? `/en${path}` : path;
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            {t("manifesto.title")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("manifesto.subtitle")}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto"></div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-gray max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {t("manifesto.whyTitle")}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t("manifesto.whyP1")}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("manifesto.whyP2")}
              </p>
            </div>

            {/* Core Principles */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {t("manifesto.principlesTitle")}
              </h2>
              
              <div className="space-y-8">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-accent/10 border-l-4 border-accent">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t("manifesto.principle1Title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("manifesto.principle1Text")}
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-accent/10 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t("manifesto.principle2Title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("manifesto.principle2Text")}
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-accent/10 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t("manifesto.principle3Title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("manifesto.principle3Text")}
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-orange-50 to-accent/10 border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t("manifesto.principle4Title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("manifesto.principle4Text")}
                  </p>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {t("manifesto.missionTitle")}
              </h2>
              <div className="bg-gradient-to-r from-accent/10 via-white to-accent/10 p-8 border border-accent/20">
                <p className="text-xl text-gray-800 leading-relaxed text-center font-medium">
                  &quot;{t("manifesto.missionQuote")}&quot;
                </p>
              </div>
            </div>

            {/* What We Fight Against */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {t("manifesto.fightTitle")}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-50 border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    {t("manifesto.fight1Title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("manifesto.fight1Text")}
                  </p>
                </div>

                <div className="p-6 bg-red-50 border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    {t("manifesto.fight2Title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("manifesto.fight2Text")}
                  </p>
                </div>

                <div className="p-6 bg-red-50 border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    {t("manifesto.fight3Title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("manifesto.fight3Text")}
                  </p>
                </div>

                <div className="p-6 bg-red-50 border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    {t("manifesto.fight4Title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("manifesto.fight4Text")}
                  </p>
                </div>
              </div>
            </div>

            {/* Our Solution */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {t("manifesto.solutionTitle")}
              </h2>
              
              <div className="bg-gradient-to-r from-green-50 via-white to-green-50 p-8 border-2 border-green-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">
                    {t("manifesto.solutionSubtitle")}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t("manifesto.solutionDescription")}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{t("manifesto.solutionStep1Title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("manifesto.solutionStep1Text")}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{t("manifesto.solutionStep2Title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("manifesto.solutionStep2Text")}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{t("manifesto.solutionStep3Title")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("manifesto.solutionStep3Text")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                {t("manifesto.ctaTitle")}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t("manifesto.ctaText")}
              </p>
              
              <div className="text-center">
                <Link
                  href={getLocalizedPath("/#contact")}
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t("manifesto.ctaButton")}
                </Link>
              </div>
            </div>

            {/* Footer Quote */}
            <div className="border-t border-gray-200 pt-8">
              <blockquote className="text-center">
                <p className="text-xl text-gray-600 italic leading-relaxed">
                  {t("manifesto.quote")}
                </p>
              </blockquote>
            </div>

          </article>
        </div>
      </div>

      <Footer />
    </div>
  )
}
