import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/5 via-white to-accent/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm  p-12 shadow-2xl border border-accent/20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            Gagnez du temps et de l&apos;argent
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Faites le premier pas vers une véritable propriété du code
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-accent text-white px-12 py-5  text-lg font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Commencer la migration
            </button>
            <button 
              onClick={() => window.location.href = '/blog'}
              className="border-2 border-accent text-accent px-12 py-5  text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Consulter notre blog
            </button>
          </div>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Vous voulez voir un cas d&apos;utilisation réel d&apos;A2H en action ?<br/>
            <Link 
              href="/blog/reprendre-main-code-lovable-prototype-controle-total"
              className="text-accent hover:text-accent/80 underline font-medium transition-colors duration-200"
            >
              Consultez notre article de blog
            </Link> pour un exemple détaillé.
          </p>
        </div>
      </div>
    </section>
  );
}
