"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export function CloudPricingCalculator() {
  const { t } = useTranslation();
  const [monthlyPrice, setMonthlyPrice] = useState(100);
  const oneTimePrice = monthlyPrice * 5;
  const breakEvenMonths = 5;
  const yearOneSavings = monthlyPrice * 12 - oneTimePrice;
  const yearTwoSavings = monthlyPrice * 12;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyPrice(Number(e.target.value));
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 p-8 md:p-10 shadow-lg">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold mb-4 text-accent">
          {t("calculator.title")}
        </h3>
        <p className="text-gray-600 text-lg">
          {t("calculator.subtitle")}
        </p>
      </div>

      {/* Slider Section */}
      <div className="mb-10 p-6 bg-gray-50 border border-gray-200">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold mb-2 text-gray-800">
            {t("calculator.currentCost")}
          </h4>
          <div className="text-4xl font-bold text-accent mb-2">
            {monthlyPrice}€
          </div>
          <span className="text-gray-600">{t("calculator.perMonth")}</span>
        </div>
        
        <div className="max-w-md mx-auto">
          <input
            type="range"
            min="50"
            max="500"
            step="50"
            value={monthlyPrice}
            onChange={handleSliderChange}
            className="w-full h-3 bg-gray-200 appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #5D3891 0%, #5D3891 ${((monthlyPrice - 50) / (500 - 50)) * 100}%, #e5e7eb ${((monthlyPrice - 50) / (500 - 50)) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>50€</span>
            <span>500€</span>
          </div>
        </div>
      </div>

      {/* Comparison Section - Subtle */}
      <div className="flex justify-center items-center gap-12 mb-8 text-center">
        {/* Current Cost */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">{t("calculator.currentCost12Months")}</span>
          <span className="text-2xl font-bold text-gray-600">{monthlyPrice * 12}€</span>
          <span className="text-xs text-gray-400">{t("calculator.continuousPayments")}</span>
        </div>

        <div className="text-gray-300 text-2xl">{t("calculator.vs")}</div>

        {/* AI2H Cost */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">{t("calculator.a2hMigration")}</span>
          <span className="text-2xl font-bold text-accent">{oneTimePrice}€</span>
          <span className="text-xs text-gray-400">{t("calculator.oneTimePayment")}</span>
        </div>
      </div>

      {/* Break-even - Subtle */}
      <div className="text-center mb-8">
        <span className="text-sm text-gray-500">
          {t("calculator.breakEven")} <span className="font-semibold text-accent">{breakEvenMonths} {t("calculator.months")}</span>
        </span>
      </div>

      {/* Savings Section - Prominent */}
      <div className="p-10 bg-gradient-to-r from-green-50 via-accent/10 to-green-50 border-2 border-green-300 shadow-lg">
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold mb-6 text-gray-800">
            {t("calculator.savings")}
          </h4>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 bg-white border-2 border-green-200">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">{t("calculator.firstYear")}</h5>
              <div className="text-4xl font-bold text-accent mb-2">
                {yearOneSavings}€
              </div>
              <p className="text-sm text-gray-600">
                {t("calculator.firstYearDescription")}
              </p>
            </div>
            
            <div className="p-6 bg-white border-2 border-accent/20">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">{t("calculator.eachYear")}</h5>
              <div className="text-4xl font-bold text-accent mb-2">
                {yearTwoSavings}€
              </div>
              <p className="text-sm text-gray-600">
                {t("calculator.eachYearDescription")}
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={scrollToContact}
            className="bg-accent text-white px-6 py-3 md:px-12 md:py-5 text-lg md:text-xl font-semibold hover:bg-accent/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 md:gap-3 mx-auto"
          >
            {t("calculator.startNow")}
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #5D3891;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #5D3891;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}