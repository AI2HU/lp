"use client";

import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation();
  
  const getLocalizedPath = (path: string) => {
    return i18n.language === 'en' ? `/en${path}` : path;
  };
  return (
    <footer className="bg-gradient-to-br from-black to-accent text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
            AI2H
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t("footer.tagline")}
          </p>
        </div>
        
        {/* Footer Links */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-32 max-w-2xl">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">{t("footer.services")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href={getLocalizedPath("/#benefits")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.advantages")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/#process")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.process")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/#pricing-calculator")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.calculator")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/#contact")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.contact")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/audit")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.securityAudit")}
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">{t("footer.resources")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href={getLocalizedPath("/blog")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.blog")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/manifeste")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.manifesto")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/blog/reprendre-main-code-lovable-prototype-controle-total")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.lovableUseCase")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/t/vibe-code")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.vibeMigration")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/t/code-ia-trop-cher")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.codeTooExpensive")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/t/code-ia-bloque")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.codeBlocked")}
                  </Link>
                </li>
                <li>
                  <Link href={getLocalizedPath("/t/reassurance-production-vibe-code")} className="text-gray-300 hover:font-bold transition-all duration-300">
                    {t("footer.productionReassurance")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              {t("footer.copyright")}
            </p>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/company/ai2h" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
