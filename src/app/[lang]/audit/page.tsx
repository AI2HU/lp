"use client";

import { useState, use } from "react";
import { Nav } from "@/component/Nav";
import { Footer } from "@/component/Footer";
import { useTranslation } from "react-i18next";
import frTranslations from '@/i18n/locales/fr.json';
import enTranslations from '@/i18n/locales/en.json';

type Translations = typeof frTranslations;

function getTranslations(lang: string): Translations {
  return lang === 'en' ? enTranslations : frTranslations;
}

function getFindingTranslation(type: string, lang: string): { title: string; description: string } {
  const translations = getTranslations(lang);
  const findingsByType = translations.pdf?.findingsByType;
  if (!findingsByType) {
    return { title: "", description: "" };
  }
  const finding = findingsByType[type as keyof typeof findingsByType];
  return finding || { title: "", description: "" };
}

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

export default function AuditPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [emailName, setEmailName] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError(t("audit.urlRequired"));
      return;
    }

    const normalizedUrl = normalizeUrl(url);

    setIsSubmitting(true);
    setError("");
    setResult(null);
    setEmailName("");
    setEmailError("");
    setEmailSent(false);

    try {
      const response = await fetch('/api/goditor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("audit.auditFailed"));
      }

      setResult(data);
    } catch (err) {
      console.error("Error submitting audit:", err);
      setError(err instanceof Error ? err.message : t("audit.auditFailedRetry"));
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
    const severityKey = severity.toLowerCase();
    const severityTranslations: Record<string, string> = {
      'critical': t("audit.severity.critical"),
      'high': t("audit.severity.high"),
      'medium': t("audit.severity.medium"),
      'low': t("audit.severity.low"),
      'info': t("audit.severity.info")
    };
    return severityTranslations[severityKey] || severity;
  };

  const normalizeUrl = (urlString: string): string => {
    if (!urlString.trim()) {
      return '';
    }
    
    let normalized = urlString.trim();
    
    if (normalized.startsWith('http://')) {
      normalized = normalized.replace('http://', 'https://');
    } else if (!normalized.startsWith('https://')) {
      normalized = `https://${normalized}`;
    }
    
    return normalized;
  };

  const extractDomain = (urlString: string): string => {
    try {
      const urlObj = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
      return urlObj.hostname.replace(/^www\./, '');
    } catch {
      return urlString.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailName.trim()) {
      setEmailError(t("audit.emailNameRequired"));
      return;
    }

    if (!result) {
      setEmailError(t("audit.noAuditResult"));
      return;
    }

    setIsSendingEmail(true);
    setEmailError("");
    setEmailSent(false);

    try {
      const domain = extractDomain(result.url);
      const fullEmail = `${emailName.trim()}@${domain}`;

      const response = await fetch('/api/goditor/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: result.url,
          email: fullEmail,
          lang: lang,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("audit.emailFailed"));
      }

      setEmailSent(true);
      setEmailName("");
    } catch (err) {
      console.error("Error sending email:", err);
      setEmailError(err instanceof Error ? err.message : t("audit.emailFailedRetry"));
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white text-black">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{t("audit.title")}</h1>
            </div>

            <div className="bg-white border-2 border-gray-200 p-4 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="url" className="block text-lg font-semibold mb-2">
                    {t("audit.urlLabel")}
                  </label>
                  <div className="flex items-center">
                    <span className="h-12 px-3 sm:px-4 text-base sm:text-lg border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-700 flex items-center whitespace-nowrap">
                      https://
                    </span>
                    <input
                      id="url"
                      type="text"
                      value={url}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.startsWith('https://')) {
                          value = value.replace('https://', '');
                        } else if (value.startsWith('http://')) {
                          value = value.replace('http://', '');
                        }
                        setUrl(value);
                        setError("");
                      }}
                      placeholder={t("audit.urlPlaceholder")}
                      className={`flex-1 h-12 px-3 sm:px-4 text-base sm:text-lg border-2 bg-white ${
                        error ? "border-red-500" : "border-gray-300 focus:border-accent"
                      } focus:outline-none transition-colors`}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white h-12 sm:h-14 text-lg sm:text-xl font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>{t("audit.auditInProgress")}</span>
                    </div>
                  ) : (
                    t("audit.launchAudit")
                  )}
                </button>
              </form>

              {result && (
                <div className="mt-8 space-y-6">
                  <div className="bg-gray-50 border-2 border-gray-200 p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t("audit.summaryTitle")}</h2>
                    <div className="space-y-2">
                      <p className="text-lg">
                        <span className="font-semibold">{t("audit.auditedSite")}</span> {result.url}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">{t("audit.totalFindings")}</span> {result.summary.total_findings}
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
                        <span className="px-2 sm:px-3 py-1 text-sm sm:text-base bg-red-100 text-red-800">
                          {t("audit.severity.critical")}: {result.summary.critical}
                        </span>
                        <span className="px-2 sm:px-3 py-1 text-sm sm:text-base bg-orange-100 text-orange-800">
                          {t("audit.severity.high")}: {result.summary.high}
                        </span>
                        <span className="px-2 sm:px-3 py-1 text-sm sm:text-base bg-yellow-100 text-yellow-800">
                          {t("audit.severity.medium")}: {result.summary.medium}
                        </span>
                        <span className="px-2 sm:px-3 py-1 text-sm sm:text-base bg-blue-100 text-blue-800">
                          {t("audit.severity.low")}: {result.summary.low}
                        </span>
                      </div>
                    </div>
                  </div>

                  {result && (
                    <div className="bg-blue-50 border-2 border-blue-200 p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("audit.emailTitle")}</h3>
                      {emailSent ? (
                        <div className="bg-green-100 border-2 border-green-300 p-4 text-center">
                          <p className="text-lg font-semibold text-green-800">
                            {t("audit.emailSuccess")}
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                          <div>
                            <label htmlFor="emailName" className="block text-base sm:text-lg font-semibold mb-2">
                              {t("audit.emailLabel")}
                            </label>
                            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                              <input
                                id="emailName"
                                type="text"
                                value={emailName}
                                onChange={(e) => {
                                  setEmailName(e.target.value);
                                  setEmailError("");
                                }}
                                placeholder={t("audit.emailPlaceholder")}
                                className={`flex-1 min-w-0 h-12 px-3 sm:px-4 text-base sm:text-lg border-2 bg-white ${
                                  emailError ? "border-red-500" : "border-gray-300 focus:border-accent"
                                } focus:outline-none transition-colors`}
                                required
                                pattern="[a-zA-Z0-9._-]+"
                                title={t("audit.emailPatternTitle")}
                              />
                              <span className="flex-1 text-base sm:text-lg font-semibold text-gray-700 whitespace-nowrap">
                                @{extractDomain(result.url)}
                              </span>
                            </div>
                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                            <p className="text-sm text-gray-600 mt-2">
                              {t("audit.emailHelp")}
                            </p>
                          </div>
                          <button
                            type="submit"
                            disabled={isSendingEmail}
                            className="w-full bg-accent text-white h-12 text-base sm:text-lg font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSendingEmail ? (
                              <div className="flex items-center justify-center gap-3">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                <span>{t("audit.sendingEmail")}</span>
                              </div>
                            ) : (
                              t("audit.sendReport")
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {result.findings.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900">{t("audit.results")}</h3>
                      {result.findings.map((finding, index) => {
                        const translatedFinding = getFindingTranslation(finding.type, lang);
                        const displayTitle = translatedFinding.title || finding.title;
                        const displayDescription = translatedFinding.description || finding.description;
                        
                        return (
                          <div
                            key={index}
                            className={`border-2 p-6 ${getSeverityColor(finding.severity)}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-lg font-semibold">{displayTitle}</h4>
                              <span className="px-3 py-1 bg-white/50 text-sm font-semibold">
                                {translateSeverity(finding.severity)}
                              </span>
                            </div>
                            <p className="text-sm mb-2">
                              <span className="font-semibold">{t("audit.type")}</span> {finding.type}
                            </p>
                            <p className="mb-2">{displayDescription}</p>
                            {finding.evidence && (
                              <div className="mt-3 p-3 bg-white/50">
                                <p className="text-sm font-semibold mb-1">{t("audit.evidence")}</p>
                                <p className="text-sm font-mono break-all">{finding.evidence}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-green-50 border-2 border-green-200 p-6 text-center">
                      <p className="text-lg font-semibold text-green-800">
                        {t("audit.noFindings")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-12 bg-gray-50 border-2 border-gray-200 p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t("audit.aboutTitle")}</h2>
                <p className="text-lg text-gray-700 mb-6">
                  {t("audit.aboutDescription")}
                </p>
                <div className="mt-8 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("audit.whyQuestion")}</h3>
                    <p className="text-gray-700">
                      {t("audit.whyAnswer")}
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

