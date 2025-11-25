"use client";

import { FaShieldAlt, FaChartLine, FaRocket, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export function BenefitsSection() {
  const { t } = useTranslation();
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            {t("benefits.title")}
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {t("benefits.subtitle")}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="group p-6 sm:p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/30 hover:-translate-y-2">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                <FaShieldAlt className="text-accent text-xl sm:text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 leading-tight">{t("benefits.savings.title")}</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("benefits.savings.description")}
            </p>
          </div>
          <div className="group p-6 sm:p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/30 hover:-translate-y-2">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                <FaChartLine className="text-accent text-xl sm:text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 leading-tight">{t("benefits.ownership.title")}</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("benefits.ownership.description")}
            </p>
          </div>
          <div className="group p-6 sm:p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/30 hover:-translate-y-2">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                <FaRocket className="text-accent text-xl sm:text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 leading-tight">{t("benefits.migration.title")}</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("benefits.migration.description")}
            </p>
          </div>
          <div className="group p-6 sm:p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/30 hover:-translate-y-2">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                <FaCheckCircle className="text-accent text-xl sm:text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 leading-tight">{t("benefits.performance.title")}</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("benefits.performance.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
