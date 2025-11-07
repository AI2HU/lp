import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black to-accent text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
            A2H
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Migrez votre code IA vers du code humain
          </p>
        </div>
        
        {/* Footer Links */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-32 max-w-2xl">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#benefits" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Avantages
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Processus
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing-calculator" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Calculateur
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/audit" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Audit de sécurité
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Ressources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/manifeste" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Manifeste
                  </Link>
                </li>
                <li>
                  <Link href="/blog/reprendre-main-code-lovable-prototype-controle-total" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Cas d&apos;usage Lovable
                  </Link>
                </li>
                <li>
                  <Link href="/t/vibe-code" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Migration Vibe
                  </Link>
                </li>
                <li>
                  <Link href="/t/code-ia-trop-cher" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Code IA trop cher ?
                  </Link>
                </li>
                <li>
                  <Link href="/t/code-ia-bloque" className="text-gray-300 hover:font-bold transition-all duration-300">
                    Code IA bloqué ?
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © 2025 A2H. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/company/ai2h" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
