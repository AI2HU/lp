import Link from 'next/link'
import { Footer } from '@/component/Footer'

export default function ManifestePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            Manifeste A2H
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Notre vision pour libérer le développement logiciel de la dépendance à l&apos;IA
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto"></div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-gray max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Pourquoi ce manifeste ?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                L&apos;intelligence artificielle a révolutionné le développement logiciel, mais elle a aussi créé une nouvelle forme de dépendance. 
                Les développeurs et les entreprises se retrouvent prisonniers d&apos;abonnements coûteux, de code généré qu&apos;ils ne comprennent pas, 
                et de solutions qui les éloignent de leur autonomie technique.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Chez A2H, nous croyons qu&apos;il est temps de reprendre le contrôle. Ce manifeste expose notre vision d&apos;un développement 
                logiciel libéré, autonome et durable.
              </p>
            </div>

            {/* Core Principles */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Nos principes fondamentaux
              </h2>
              
              <div className="space-y-8">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-accent/10 border-l-4 border-accent">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    1. L&apos;autonomie technique avant tout
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Un développeur doit comprendre et maîtriser son code. L&apos;IA doit être un outil, pas un maître. 
                    Nous migrons votre code généré vers du code humain que vous pouvez lire, modifier et maintenir.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-accent/10 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    2. La liberté financière par l&apos;indépendance
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les abonnements IA créent une dépendance financière croissante. Notre migration unique vous libère 
                    définitivement de ces coûts récurrents en transformant votre code IA en code que vous possédez entièrement.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-50 to-accent/10 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    3. La qualité et la maintenabilité
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Le code généré par l&apos;IA est souvent fonctionnel mais rarement optimal. Nous transformons votre code 
                    en une solution robuste, performante et facile à maintenir sur le long terme.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-orange-50 to-accent/10 border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    4. La transparence et la confiance
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chaque ligne de code migré est expliquée, documentée et livrée avec une formation complète. 
                    Vous comprenez ce que vous obtenez et comment l&apos;utiliser.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Notre mission
              </h2>
              <div className="bg-gradient-to-r from-accent/10 via-white to-accent/10 p-8 border border-accent/20">
                <p className="text-xl text-gray-800 leading-relaxed text-center font-medium">
                  &quot;Libérer chaque développeur et chaque entreprise de la dépendance à l&apos;IA en leur donnant 
                  les moyens de posséder, comprendre et maîtriser leur technologie.&quot;
                </p>
              </div>
            </div>

            {/* What We Fight Against */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Ce contre quoi nous luttons
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-50 border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    🚫 La dépendance financière
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Les abonnements IA qui s&apos;accumulent et créent une charge financière croissante et imprévisible.
                  </p>
                </div>

                <div className="p-6 bg-red-50 border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    🚫 Le code opaque
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Du code généré que personne ne comprend, créant des risques techniques et de maintenance.
                  </p>
                </div>

                <div className="p-6 bg-red-50 border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    🚫 La perte d&apos;autonomie
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    La dépendance technologique qui éloigne les équipes de leur expertise métier.
                  </p>
                </div>

                <div className="p-6 bg-red-50 border border-red-200">
                  <h3 className="text-lg font-bold text-red-800 mb-3">
                    🚫 Les solutions temporaires
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Des prototypes qui restent des prototypes, sans évolution vers des solutions durables.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Solution */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Notre solution
              </h2>
              
              <div className="bg-gradient-to-r from-green-50 via-white to-green-50 p-8 border-2 border-green-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">
                    Migration IA vers Code Humain
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Une approche unique qui transforme définitivement votre code IA en code humain, 
                    vous rendant autonome et libre de toute dépendance.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Analyse</h4>
                    <p className="text-sm text-gray-600">
                      Compréhension complète de votre code IA et de vos besoins métier
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Migration</h4>
                    <p className="text-sm text-gray-600">
                      Transformation en code humain optimisé, documenté et maintenable
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Formation</h4>
                    <p className="text-sm text-gray-600">
                      Transfert de compétences pour une autonomie complète
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Rejoignez le mouvement
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Si vous partagez notre vision d&apos;un développement logiciel libre et autonome, 
                si vous en avez assez des abonnements qui s&apos;accumulent et du code que vous ne maîtrisez pas, 
                alors vous êtes prêt pour la migration A2H.
              </p>
              
              <div className="text-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Commencer votre migration
                </Link>
              </div>
            </div>

            {/* Footer Quote */}
            <div className="border-t border-gray-200 pt-8">
              <blockquote className="text-center">
                <p className="text-xl text-gray-600 italic leading-relaxed">
                  Code is Law.
                </p>
              </blockquote>
            </div>

          </article>
        </div>
      </div>

      <Footer />
    </div>
  )
}
