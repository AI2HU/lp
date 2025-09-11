import Image from "next/image";

export function AIServicesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-accent bg-clip-text text-transparent leading-tight">
            A2H vous aide à migrer de ces services
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Les agents IA créent du code, mais vous restez dépendant de leurs plateformes. 
            Nous vous libérons de cette dépendance en convertissant votre code IA en code humain robuste.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          <div className="group flex flex-col items-center p-4">
            <div className="relative w-16 h-16 mb-2 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/base44.png"
                alt="Base44"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 text-center">Base44</h3>
          </div>
          
          <div className="group flex flex-col items-center p-4">
            <div className="relative w-16 h-16 mb-2 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/bolt.png"
                alt="Bolt"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 text-center">Bolt</h3>
          </div>
          
          <div className="group flex flex-col items-center p-4">
            <div className="relative w-16 h-16 mb-2 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/hostinger.png"
                alt="Hostinger"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 text-center">Hostinger</h3>
          </div>
          
          <div className="group flex flex-col items-center p-4">
            <div className="relative w-16 h-16 mb-2 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/lovable.png"
                alt="Lovable"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 text-center">Lovable</h3>
          </div>
          
          <div className="group flex flex-col items-center p-4">
            <div className="relative w-16 h-16 mb-2 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/replit.png"
                alt="Replit"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 text-center">Replit</h3>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-accent">Ces plateformes génèrent du code avec l&apos;IA</span>, 
              mais vous restez prisonnier de leurs écosystèmes. 
              <span className="font-semibold text-accent"><br />A2H vous libère</span> en transformant ce code IA 
              en code humain que vous possédez entièrement et pouvez déployer partout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
