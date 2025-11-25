"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export function TokenPricingCalculator() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'fr' ? 'fr-FR' : 'en-US';
  const [dailyRequests, setDailyRequests] = useState(150);
  const [avgTokensPerRequest, setAvgTokensPerRequest] = useState(3000);
  const [contextReduction, setContextReduction] = useState(30);
  
  // Token pricing (per 1M tokens) - approximate rates for GPT-4 in EUR
  const inputTokenPrice = 27; // €27 per 1M input tokens
  
  // Time cost calculation: 400EUR per day for 8 hours work
  const dailyCost = 400; // EUR per day
  const workHoursPerDay = 8;
  const workMinutesPerDay = workHoursPerDay * 60; // 480 minutes
  const costPerMinute = dailyCost / workMinutesPerDay; // ~0.833 EUR per minute
  const costPerHour = dailyCost / workHoursPerDay; // 50 EUR per hour
  
  // Calculate costs
  const totalTokensPerRequest = avgTokensPerRequest;
  const tokensSavedPerRequest = Math.floor(avgTokensPerRequest * (contextReduction / 100));
  const tokensUsedPerRequest = totalTokensPerRequest - tokensSavedPerRequest;
  
  const dailyTokensUsed = dailyRequests * tokensUsedPerRequest;
  const dailyTokensSaved = dailyRequests * tokensSavedPerRequest;
  
  const monthlyTokensUsed = dailyTokensUsed * 30;
  const monthlyTokensSaved = dailyTokensSaved * 30;
  
  const monthlyCostCurrent = (monthlyTokensUsed / 1000000) * inputTokenPrice;
  const monthlyCostOptimized = ((monthlyTokensUsed - monthlyTokensSaved) / 1000000) * inputTokenPrice;
  const monthlySavings = monthlyCostCurrent - monthlyCostOptimized;
  
  const yearlySavings = monthlySavings * 12;

  // Time estimation calculations including failure exponential growth
  const avgResponseTimePerRequest = 3; // seconds per successful request
  const baseFailureRate = Math.min(0.6, Math.max(0.1, (avgTokensPerRequest / 10000) * 0.4)); // Base failure rate based on context size
  const retryMultiplier = 2.5; // Average retries per failed request
  const debuggingTimePerFailure = 15; // minutes spent debugging per failure
  
  // Calculate current failure impact (with large context)
  const currentFailureRate = baseFailureRate;
  const currentRequestsWithFailures = dailyRequests * currentFailureRate;
  const currentDebuggingTimeMinutes = currentRequestsWithFailures * debuggingTimePerFailure;
  
  // Calculate optimized failure impact (with reduced context)
  const optimizedFailureRate = Math.max(0.05, baseFailureRate * (1 - contextReduction / 100));
  const optimizedRequestsWithFailures = dailyRequests * optimizedFailureRate;
  const optimizedDebuggingTimeMinutes = optimizedRequestsWithFailures * debuggingTimePerFailure;
  
  // Calculate time savings (always positive)
  const currentTotalTimeMinutes = (dailyRequests * avgResponseTimePerRequest / 60) + currentDebuggingTimeMinutes;
  const optimizedTotalTimeMinutes = (dailyRequests * avgResponseTimePerRequest / 60) + optimizedDebuggingTimeMinutes;
  const dailyTimeSavedMinutes = Math.max(0, Math.round(currentTotalTimeMinutes - optimizedTotalTimeMinutes));
  
  const monthlyTimeSavedMinutes = dailyTimeSavedMinutes * 30;
  const yearlyTimeSavedMinutes = monthlyTimeSavedMinutes * 12;
  
  // Convert to more readable formats
  const monthlyTimeSavedHours = Math.round(monthlyTimeSavedMinutes / 60);
  const yearlyTimeSavedDays = Math.round(yearlyTimeSavedMinutes / (60 * 24));
  
  // Calculate time savings cost
  const monthlyTimeSavedCost = monthlyTimeSavedHours * costPerHour;
  const yearlyTimeSavedHours = Math.round(yearlyTimeSavedMinutes / 60);
  const yearlyTimeSavedCost = yearlyTimeSavedHours * costPerHour;
  
  // Total savings including time gain
  const monthlyTotalSavings = monthlySavings + monthlyTimeSavedCost;
  const yearlyTotalSavings = (monthlySavings * 12) + yearlyTimeSavedCost;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
    setter(Number(e.target.value));
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
          {t("tokenCalculator.title")}
        </h3>
        <p className="text-gray-600 text-lg">
          {t("tokenCalculator.subtitle")}
        </p>
      </div>

      {/* Configuration Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Daily Requests */}
        <div className="p-6 bg-gray-50 border border-gray-200">
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              {t("tokenCalculator.dailyRequests")}
            </h4>
            <div className="text-3xl font-bold text-accent mb-1">
              {dailyRequests}
            </div>
            <span className="text-gray-600 text-sm">{t("tokenCalculator.perDay")}</span>
          </div>
          
          <div className="max-w-full">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={dailyRequests}
              onChange={(e) => handleSliderChange(e, setDailyRequests)}
              className="w-full h-3 bg-gray-200 appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #5D3891 0%, #5D3891 ${((dailyRequests - 10) / (1000 - 10)) * 100}%, #e5e7eb ${((dailyRequests - 10) / (1000 - 10)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10</span>
              <span>1000</span>
            </div>
          </div>
        </div>

        {/* Average Tokens */}
        <div className="p-6 bg-gray-50 border border-gray-200">
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              {t("tokenCalculator.tokensPerRequest")}
            </h4>
            <div className="text-3xl font-bold text-accent mb-1">
              {avgTokensPerRequest.toLocaleString(locale)}
            </div>
            <span className="text-gray-600 text-sm">{t("tokenCalculator.averageTokens")}</span>
          </div>
          
          <div className="max-w-full">
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={avgTokensPerRequest}
              onChange={(e) => handleSliderChange(e, setAvgTokensPerRequest)}
              className="w-full h-3 bg-gray-200 appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #5D3891 0%, #5D3891 ${((avgTokensPerRequest - 100) / (10000 - 100)) * 100}%, #e5e7eb ${((avgTokensPerRequest - 100) / (10000 - 100)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>100</span>
              <span>10K</span>
            </div>
          </div>
        </div>

        {/* Context Reduction */}
        <div className="p-6 bg-gray-50 border border-gray-200">
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              {t("tokenCalculator.contextReduction")}
            </h4>
            <div className="text-3xl font-bold text-accent mb-1">
              {contextReduction}%
            </div>
            <span className="text-gray-600 text-sm">{t("tokenCalculator.optimization")}</span>
          </div>
          
          <div className="max-w-full">
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={contextReduction}
              onChange={(e) => handleSliderChange(e, setContextReduction)}
              className="w-full h-3 bg-gray-200 appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #5D3891 0%, #5D3891 ${((contextReduction - 10) / (40 - 10)) * 100}%, #e5e7eb ${((contextReduction - 10) / (40 - 10)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>40%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current vs Optimized Comparison */}
      <div className="flex justify-center items-center gap-12 mb-8 text-center">
        {/* Current Usage */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">{t("tokenCalculator.currentUsage")}</span>
          <span className="text-2xl font-bold text-gray-600">{monthlyTokensUsed.toLocaleString(locale)} {t("tokenCalculator.tokens")}</span>
          <span className="text-xs text-gray-400">{t("tokenCalculator.nonOptimizedContext")}</span>
        </div>

        <div className="text-gray-300 text-2xl">{t("calculator.vs")}</div>

        {/* Optimized Usage */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">{t("tokenCalculator.optimizedUsage")}</span>
          <span className="text-2xl font-bold text-accent">{(monthlyTokensUsed - monthlyTokensSaved).toLocaleString(locale)} {t("tokenCalculator.tokens")}</span>
          <span className="text-xs text-gray-400">{t("tokenCalculator.reducedContext")}</span>
        </div>
      </div>

      {/* Time Savings Section */}
      <div className="p-8 bg-gradient-to-r from-purple-50 via-accent/10 to-purple-50 border-2 border-purple-300 shadow-lg mb-8">
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold mb-4 text-gray-800">
            {t("tokenCalculator.timeGainedTitle")}
          </h4>
          <p className="text-gray-600 text-sm">
            {t("tokenCalculator.timeGainedDescription")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white border-2 border-purple-200 text-center">
            <h5 className="text-lg font-semibold text-gray-700 mb-2">{t("tokenCalculator.timePerDay")}</h5>
            <div className="text-3xl font-bold text-accent mb-1">
              {dailyTimeSavedMinutes} {t("tokenCalculator.minutes")}
            </div>
            <p className="text-sm text-gray-600">
              {t("tokenCalculator.dailyTimeSaved")}
            </p>
          </div>
          
          <div className="p-4 bg-white border-2 border-accent/20 text-center">
            <h5 className="text-lg font-semibold text-gray-700 mb-2">{t("tokenCalculator.timePerMonth")}</h5>
            <div className="text-3xl font-bold text-accent mb-1">
              {monthlyTimeSavedHours} {t("tokenCalculator.hours")}
            </div>
            <p className="text-sm text-gray-600">
              {t("tokenCalculator.monthlyHoursSaved")}
            </p>
          </div>
          
          <div className="p-4 bg-white border-2 border-purple-200 text-center">
            <h5 className="text-lg font-semibold text-gray-700 mb-2">{t("tokenCalculator.timePerYear")}</h5>
            <div className="text-3xl font-bold text-accent mb-1">
              {yearlyTimeSavedDays} {t("tokenCalculator.days")}
            </div>
            <p className="text-sm text-gray-600">
              {t("tokenCalculator.personDaysSaved")}
            </p>
          </div>
        </div>
      </div>

      {/* Savings Section */}
      <div className="p-10 bg-gradient-to-r from-blue-50 via-accent/10 to-blue-50 border-2 border-blue-300 shadow-lg">
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold mb-6 text-gray-800">
            {t("tokenCalculator.savingsTitle")}
          </h4>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white border-2 border-accent/20">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">{t("tokenCalculator.llmSavings")}</h5>
              <div className="text-4xl font-bold text-accent mb-2">
                {Math.round(monthlySavings).toLocaleString(locale)} €
              </div>
              <p className="text-sm text-gray-600">
                {t("tokenCalculator.monthlyTokenCosts")}
              </p>
            </div>
            
            <div className="p-6 bg-white border-2 border-purple-200">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">{t("tokenCalculator.timeGain")}</h5>
              <div className="text-4xl font-bold text-accent mb-2">
                {Math.round(monthlyTimeSavedCost).toLocaleString(locale)} €
              </div>
              <p className="text-sm text-gray-600">
                {t("tokenCalculator.monthlyTimeValue")}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {t("tokenCalculator.timeCostNote")}
              </p>
            </div>
            
            <div className="p-6 bg-white border-2 border-green-200">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">{t("tokenCalculator.monthlyTotal")}</h5>
              <div className="text-4xl font-bold text-accent mb-2">
                {Math.round(monthlyTotalSavings).toLocaleString(locale)} €
              </div>
              <p className="text-sm text-gray-600">
                {t("tokenCalculator.totalSavings")}
              </p>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h5 className="text-xl font-semibold text-gray-700 mb-2">{t("tokenCalculator.yearlyTotalSavings")}</h5>
            <div className="text-5xl font-bold text-accent mb-2">
              {Math.round(yearlyTotalSavings).toLocaleString(locale)} €
            </div>
            <p className="text-sm text-gray-600">
              {t("tokenCalculator.includingTokensAndTime")}
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={scrollToContact}
            className="bg-accent text-white px-6 py-3 md:px-12 md:py-5 text-lg md:text-xl font-semibold hover:bg-accent/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 md:gap-3 mx-auto"
          >
            {t("tokenCalculator.optimizeContext")}
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
