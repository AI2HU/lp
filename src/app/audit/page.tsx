"use client";

import { useState } from "react";
import { Nav } from "@/component/Nav";
import { Footer } from "@/component/Footer";

interface Finding {
  type: string;
  severity: string;
  title: string;
  description: string;
  evidence?: string;
}

interface AuditResult {
  url: string;
  findings: Finding[];
  summary: {
    total_findings: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  pdf_path?: string;
}

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError("L'URL est requise");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch('/api/goditor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Échec de l\'audit');
      }

      setResult(data);
    } catch (err) {
      console.error("Error submitting audit:", err);
      setError(err instanceof Error ? err.message : 'Échec de l\'audit. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const translateSeverity = (severity: string) => {
    const translations: Record<string, string> = {
      'critical': 'Critique',
      'high': 'Élevé',
      'medium': 'Moyen',
      'low': 'Faible',
      'info': 'Information'
    };
    return translations[severity.toLowerCase()] || severity;
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white text-black">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Audit de Sécurité</h1>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="url" className="block text-lg font-semibold mb-2">
                    URL du site web *
                  </label>
                  <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError("");
                    }}
                    placeholder="https://example.com"
                    className={`w-full h-12 px-4 text-lg border-2 bg-white ${
                      error ? "border-red-500" : "border-gray-300 focus:border-accent"
                    } focus:outline-none transition-colors`}
                    required
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white h-14 text-xl font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Audit en cours...</span>
                    </div>
                  ) : (
                    "Lancer l'audit"
                  )}
                </button>
              </form>

              {result && (
                <div className="mt-8 space-y-6">
                  <div className="bg-gray-50 border-2 border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Récapitulatif de l&apos;audit</h2>
                    <div className="space-y-2">
                      <p className="text-lg">
                        <span className="font-semibold">Site audité :</span> {result.url}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Total des résultats (Moyen & Faible) :</span> {result.summary.total_findings}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <span className="px-3 py-1 bg-red-100 text-red-800">
                          Critique: {result.summary.critical}
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800">
                          Élevé: {result.summary.high}
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800">
                          Moyen: {result.summary.medium}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800">
                          Faible: {result.summary.low}
                        </span>
                      </div>
                    </div>
                  </div>

                  {result.findings.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">Résultats</h3>
                      {result.findings.map((finding, index) => (
                        <div
                          key={index}
                          className={`border-2 p-6 ${getSeverityColor(finding.severity)}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-semibold">{finding.title}</h4>
                            <span className="px-3 py-1 bg-white/50 text-sm font-semibold">
                              {translateSeverity(finding.severity)}
                            </span>
                          </div>
                          <p className="text-sm mb-2">
                            <span className="font-semibold">Type:</span> {finding.type}
                          </p>
                          <p className="mb-2">{finding.description}</p>
                          {finding.evidence && (
                            <div className="mt-3 p-3 bg-white/50">
                              <p className="text-sm font-semibold mb-1">Preuve:</p>
                              <p className="text-sm font-mono break-all">{finding.evidence}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-green-50 border-2 border-green-200 p-6 text-center">
                      <p className="text-lg font-semibold text-green-800">
                        Aucun résultat de sévérité moyenne ou faible détecté.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-12 bg-gray-50 border-2 border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos de l&apos;audit de sécurité</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Cet audit se concentre sur les problèmes de sécurité courants que les LLM laissent souvent passer lors de la production de code.
                </p>
                <div className="mt-8 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Pourquoi je n&apos;ai pas accès à tout l&apos;audit ?</h3>
                    <p className="text-gray-700">
                      Des failles critiques sur le site peuvent être découvertes. Par principe de divulgation responsable, un rapport complet est uniquement envoyé à une adresse email enregistrée sous le domaine de votre site.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

