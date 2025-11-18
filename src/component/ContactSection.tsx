"use client";

import { ContactForm } from "./ContactForm";
import { useTranslation } from "react-i18next";

export function ContactSection() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t("contact.subtitle")}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto "></div>
        </div>
        <div className="bg-white  shadow-2xl p-8 md:p-12 border border-gray-100">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
