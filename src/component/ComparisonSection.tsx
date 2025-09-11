import { FaCheck, FaTimes } from "react-icons/fa";

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent">
            Comparer et économiser
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto "></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Subscription Column */}
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200  p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTimes className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-rose-600">
                Abonnement au service IA
              </h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-center text-rose-600">
                <span className="text-2xl mr-4">✕</span>
                <span className="text-lg">Paiements mensuels continus</span>
              </li>
              <li className="flex items-center text-rose-600">
                <span className="text-2xl mr-4">✕</span>
                <span className="text-lg">Verrouillé dans des systèmes propriétaires</span>
              </li>
              <li className="flex items-center text-rose-600">
                <span className="text-2xl mr-4">✕</span>
                <span className="text-lg">Options de personnalisation limitées</span>
              </li>
              <li className="flex items-center text-rose-600">
                <span className="text-2xl mr-4">✕</span>
                <span className="text-lg">Dépendance à un service tiers</span>
              </li>
            </ul>
          </div>

          {/* A2H Migration Column */}
          <div className="bg-gradient-to-br from-green-50 to-accent/10 border-2 border-accent  p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white px-4 py-2 text-sm font-semibold ">
              VOUS GAGNEZ
            </div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-accent">
                Migration unique A2H
              </h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-center text-accent">
                <span className="text-2xl mr-4">✓</span>
                <span className="text-lg font-medium">Paiement unique, propriété à vie</span>
              </li>
              <li className="flex items-center text-accent">
                <span className="text-2xl mr-4">✓</span>
                <span className="text-lg font-medium">Propriété et contrôle total du code</span>
              </li>
              <li className="flex items-center text-accent">
                <span className="text-2xl mr-4">✓</span>
                <span className="text-lg font-medium">Potentiel de personnalisation illimité</span>
              </li>
              <li className="flex items-center text-accent">
                <span className="text-2xl mr-4">✓</span>
                <span className="text-lg font-medium">Déployez n&apos;importe où, sans verrouillage par le fournisseur</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
