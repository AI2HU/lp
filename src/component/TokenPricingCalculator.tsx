"use client";

import { useState } from "react";

export function TokenPricingCalculator() {
  const [dailyRequests, setDailyRequests] = useState(100);
  const [avgTokensPerRequest, setAvgTokensPerRequest] = useState(2000);
  const [contextReduction, setContextReduction] = useState(30);
  
  // Token pricing (per 1M tokens) - approximate rates for GPT-4 in EUR
  const inputTokenPrice = 27; // €27 per 1M input tokens
  
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
          Calculez vos économies de tokens LLM
        </h3>
        <p className="text-gray-600 text-lg">
          Découvrez combien vous pourriez économiser en optimisant le contexte de vos requêtes IA
        </p>
      </div>

      {/* Configuration Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Daily Requests */}
        <div className="p-6 bg-gray-50 border border-gray-200">
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              Requêtes quotidiennes
            </h4>
            <div className="text-3xl font-bold text-accent mb-1">
              {dailyRequests}
            </div>
            <span className="text-gray-600 text-sm">par jour</span>
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
              Tokens par requête
            </h4>
            <div className="text-3xl font-bold text-accent mb-1">
              {avgTokensPerRequest.toLocaleString('fr-FR')}
            </div>
            <span className="text-gray-600 text-sm">tokens moyens</span>
          </div>
          
          <div className="max-w-full">
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={avgTokensPerRequest}
              onChange={(e) => handleSliderChange(e, setAvgTokensPerRequest)}
              className="w-full h-3 bg-gray-200 appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #5D3891 0%, #5D3891 ${((avgTokensPerRequest - 500) / (10000 - 500)) * 100}%, #e5e7eb ${((avgTokensPerRequest - 500) / (10000 - 500)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>500</span>
              <span>10K</span>
            </div>
          </div>
        </div>

        {/* Context Reduction */}
        <div className="p-6 bg-gray-50 border border-gray-200">
          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              Réduction de contexte
            </h4>
            <div className="text-3xl font-bold text-accent mb-1">
              {contextReduction}%
            </div>
            <span className="text-gray-600 text-sm">optimisation</span>
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
          <span className="text-sm text-gray-500 mb-1">Usage actuel (mensuel)</span>
          <span className="text-2xl font-bold text-gray-600">{monthlyTokensUsed.toLocaleString('fr-FR')} tokens</span>
          <span className="text-xs text-gray-400">Contexte non optimisé</span>
        </div>

        <div className="text-gray-300 text-2xl">vs</div>

        {/* Optimized Usage */}
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">Usage optimisé</span>
          <span className="text-2xl font-bold text-accent">{(monthlyTokensUsed - monthlyTokensSaved).toLocaleString('fr-FR')} tokens</span>
          <span className="text-xs text-gray-400">Contexte réduit</span>
        </div>
      </div>

      {/* Time Savings Section */}
      <div className="p-8 bg-gradient-to-r from-purple-50 via-accent/10 to-purple-50 border-2 border-purple-300 shadow-lg mb-8">
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold mb-4 text-gray-800">
            Temps gagné grâce à l&apos;optimisation (jour-homme)
          </h4>
          <p className="text-gray-600 text-sm">
            Évitez les échecs exponentiels : moins d&apos;erreurs = moins de retry et de debug
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white border-2 border-purple-200 text-center">
            <h5 className="text-lg font-semibold text-gray-700 mb-2">Par jour</h5>
            <div className="text-3xl font-bold text-accent mb-1">
              {dailyTimeSavedMinutes} min
            </div>
            <p className="text-sm text-gray-600">
              temps économisé quotidiennement
            </p>
          </div>
          
          <div className="p-4 bg-white border-2 border-accent/20 text-center">
            <h5 className="text-lg font-semibold text-gray-700 mb-2">Par mois</h5>
            <div className="text-3xl font-bold text-accent mb-1">
              {monthlyTimeSavedHours} h
            </div>
            <p className="text-sm text-gray-600">
              heures économisées mensuellement
            </p>
          </div>
          
          <div className="p-4 bg-white border-2 border-purple-200 text-center">
            <h5 className="text-lg font-semibold text-gray-700 mb-2">Par an</h5>
            <div className="text-3xl font-bold text-accent mb-1">
              {yearlyTimeSavedDays} jours
            </div>
            <p className="text-sm text-gray-600">
              jour-homme économisés
            </p>
          </div>
        </div>
      </div>

      {/* Savings Section */}
      <div className="p-10 bg-gradient-to-r from-blue-50 via-accent/10 to-blue-50 border-2 border-blue-300 shadow-lg">
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold mb-6 text-gray-800">
            Vos économies de tokens LLM
          </h4>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="p-6 bg-white border-2 border-blue-200">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">Tokens économisés</h5>
              <div className="text-4xl font-bold text-accent mb-2">
                {monthlyTokensSaved.toLocaleString('fr-FR')}
              </div>
              <p className="text-sm text-gray-600">
                par mois
              </p>
            </div>
            
            <div className="p-6 bg-white border-2 border-accent/20">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">Économies mensuelles</h5>
              <div className="text-4xl font-bold text-accent mb-2">
                {monthlySavings.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
              </div>
              <p className="text-sm text-gray-600">
                en coûts LLM
              </p>
            </div>
            
            <div className="p-6 bg-white border-2 border-green-200">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">Économies annuelles</h5>
              <div className="text-4xl font-bold text-accent mb-2">
                {yearlySavings.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
              </div>
              <p className="text-sm text-gray-600">
                par an
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={scrollToContact}
            className="bg-accent text-white px-6 py-3 md:px-12 md:py-5 text-lg md:text-xl font-semibold hover:bg-accent/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 md:gap-3 mx-auto"
          >
            Optimiser mon contexte
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
