"use client";

import { useState } from "react";

interface FormData {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectSize: string;
  stack: string;
  requiresDatabase: boolean;
  budget: string;
}

const techStacks = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Laravel",
  "WordPress",
  "Shopify",
  "Autre",
];

const projectSizes = [
  { value: "small", label: "Petit projet (1-3 mois)", price: "5 000 - 15 000 €" },
  { value: "medium", label: "Projet moyen (3-6 mois)", price: "15 000 - 50 000 €" },
  { value: "large", label: "Grand projet (6+ mois)", price: "50 000+ €" },
];

const budgetRanges = [
  "Moins de 10 000 €",
  "10 000 - 25 000 €",
  "25 000 - 50 000 €",
  "50 000 - 100 000 €",
  "Plus de 100 000 €",
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectSize: "",
    stack: "",
    requiresDatabase: false,
    budget: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.company.trim()) newErrors.company = "Le nom de l'entreprise est requis";
    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!formData.projectSize) newErrors.projectSize = "La taille du projet est requise";
    if (!formData.stack) newErrors.stack = "La technologie est requise";
    if (!formData.budget) newErrors.budget = "Le budget est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du formulaire');
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          Demande envoyée avec succès !
        </h3>
        <p className="text-green-700 mb-6">
          Notre équipe vous contactera dans les 24 heures pour discuter de votre projet.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setSubmitError("");
            setFormData({
              company: "",
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              projectSize: "",
              stack: "",
              requiresDatabase: false,
              budget: "",
            });
          }}
          className="bg-accent text-white px-6 py-3 font-semibold hover:bg-accent/80 transition-colors"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-lg font-semibold mb-2">
            Nom de l&apos;entreprise *
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="France SAS"
            className={`w-full h-12 px-4 text-lg border-2 bg-white/50 ${
              errors.company ? "border-red-500" : "border-gray-300 focus:border-accent"
            } focus:outline-none transition-colors`}
          />
          {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Prénom *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Jean"
              className={`w-full h-12 px-4 text-lg border-2 bg-white/50 ${
                errors.firstName ? "border-red-500" : "border-gray-300 focus:border-accent"
              } focus:outline-none transition-colors`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label className="block text-lg font-semibold mb-2">
              Nom *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Dupont"
              className={`w-full h-12 px-4 text-lg border-2 bg-white/50 ${
                errors.lastName ? "border-red-500" : "border-gray-300 focus:border-accent"
              } focus:outline-none transition-colors`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-lg font-semibold mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="jean.dupont@monentreprise.fr"
            className={`w-full h-12 px-4 text-lg border-2 bg-white/50 ${
              errors.email ? "border-red-500" : "border-gray-300 focus:border-accent"
            } focus:outline-none transition-colors`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-lg font-semibold mb-2">
            Téléphone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+33 1 23 45 67 89"
            className={`w-full h-12 px-4 text-lg border-2 bg-white/50 ${
              errors.phone ? "border-red-500" : "border-gray-300 focus:border-accent"
            } focus:outline-none transition-colors`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-lg font-semibold mb-2">
            Taille du projet *
          </label>
          <select
            value={formData.projectSize}
            onChange={(e) => handleInputChange("projectSize", e.target.value)}
            className={`w-full h-12 px-4 text-lg border-2 bg-white/50 ${
              errors.projectSize ? "border-red-500" : "border-gray-300 focus:border-accent"
            } focus:outline-none transition-colors`}
          >
            <option value="">Sélectionnez la taille</option>
            {projectSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label} - {size.price}
              </option>
            ))}
          </select>
          {errors.projectSize && <p className="text-red-500 text-sm mt-1">{errors.projectSize}</p>}
        </div>
        
        <div>
          <label className="block text-lg font-semibold mb-2">
            Technologie principale *
          </label>
          <select
            value={formData.stack}
            onChange={(e) => handleInputChange("stack", e.target.value)}
            className={`w-full h-12 px-4 text-lg border-2 bg-white/50 ${
              errors.stack ? "border-red-500" : "border-gray-300 focus:border-accent"
            } focus:outline-none transition-colors`}
          >
            <option value="">Sélectionnez la technologie</option>
            {techStacks.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
          {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack}</p>}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">
          Budget estimé *
        </label>
        <select
          value={formData.budget}
          onChange={(e) => handleInputChange("budget", e.target.value)}
          className={`w-full h-12 px-4 text-lg border-2 rounded-lg bg-white/50 ${
            errors.budget ? "border-red-500" : "border-gray-300 focus:border-accent"
          } focus:outline-none transition-colors`}
        >
          <option value="">Sélectionnez votre budget</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
        {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
      </div>

      <div className="bg-gray-50 border-2 border-gray-200 p-6">
        <label className="flex items-start space-x-4 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.requiresDatabase}
            onChange={(e) => handleInputChange("requiresDatabase", e.target.checked)}
            className="w-5 h-5 mt-1 text-accent border-gray-300 focus:ring-accent"
          />
          <div>
            <span className="text-lg font-semibold">
              Migration de base de données requise
            </span>
            <p className="text-gray-600 mt-1">
              Cochez si votre projet nécessite une migration de base de données existante
            </p>
          </div>
        </label>
      </div>

      {submitError && (
        <div className="bg-red-50 border-2 border-red-200 p-4 text-center">
          <p className="text-red-600 font-semibold">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white h-14 text-xl font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Envoi en cours...</span>
          </div>
        ) : (
          "Demander un devis gratuit"
        )}
      </button>
    </form>
  );
}