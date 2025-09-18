"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: "Est-ce que je dois transmettre mon code source pour bénéficier du service A2H ?",
    answer: "Non, pas lors du premier contact. Échangeons d'abord, selon vos besoins vous nous partagerez l'accès à votre code ou non. Pour un besoin de migration, A2H devra accéder à votre code."
  },
  {
    question: "Est-ce que je peux choisir vers quel service migrer ?",
    answer: "Oui ! Cependant, A2H propose d'étudier avec vous quels services privilégier. Nous choisissons les meilleurs services qualifiés selon les besoins de votre produit."
  },
  {
    question: "Est-ce que je pourrai toujours bénéficier des IAs pour le code de mon produit ?",
    answer: "Oui, toujours avec vos services IA favoris."
  },
  {
    question: "Mon code est bloqué, vous pouvez m'aider ?",
    answer: (
      <>
        Bien sûr, planifiez un{" "}
        <button
          onClick={() => window.open('https://calendly.com/jonathan-ai2h/30min', '_blank')}
          className="text-accent cursor-pointer hover:text-accent/80 font-semibold transition-colors duration-200"
        >
          Debug Express
        </button>
        {" "}! Échangeons 15 minutes pour débloquer votre situation. Le partage du code source n'est pas nécessaire.
      </>
    )
  }
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur nos services de migration de code IA
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openItems.includes(index) ? (
                    <FaChevronUp className="text-accent w-5 h-5" />
                  ) : (
                    <FaChevronDown className="text-gray-400 w-5 h-5" />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Vous avez d&apos;autres questions ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-accent text-white px-8 py-4 text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
