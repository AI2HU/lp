import { FaEuroSign, FaLock, FaSyncAlt, FaBolt } from "react-icons/fa";

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            Avantages exceptionnels
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Votre investissement se transforme en économies substantielles
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto "></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="group text-center p-6 sm:p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 hover:-translate-y-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaEuroSign className="text-accent text-3xl sm:text-4xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">Économies importantes</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Éliminez définitivement les frais d&apos;abonnement IA. Notre migration unique est rentabilisée en seulement 5 mois.
            </p>
          </div>
          <div className="group text-center p-6 sm:p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 hover:-translate-y-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaLock className="text-accent text-3xl sm:text-4xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">Propriété intellectuelle totale</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Obtenez 100% de contrôle sur votre code sans aucune dépendance continue ni restriction de licence.
            </p>
          </div>
          <div className="group text-center p-6 sm:p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 hover:-translate-y-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaSyncAlt className="text-accent text-3xl sm:text-4xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">Migration transparente</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Notre équipe d&apos;élite gère l&apos;ensemble de la transition sans interruption de service et avec un impact minimal sur vos opérations.
            </p>
          </div>
          <div className="group text-center p-6 sm:p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-accent/20 hover:-translate-y-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaBolt className="text-accent text-3xl sm:text-4xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">Performance améliorée</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Nous ne nous contentons pas de convertir, nous optimisons. Attendez-vous à un code plus propre, des performances accrues et l&apos;élimination des bizarreries générées par l&apos;IA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
