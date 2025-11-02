
import * as React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Globe, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-eticket-500 text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <h2 className="mb-4 text-xl font-bold">E-ticket</h2>
            <p className="mb-4 text-gray-300">
              Votre plateforme de billetterie en ligne pour découvrir et réserver des événements exceptionnels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-eticket-accent" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-eticket-accent" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-eticket-accent" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Liens rapides</h2>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-eticket-accent">Accueil</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-eticket-accent">Événements</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-eticket-accent">À propos</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-eticket-accent">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Légal</h2>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/terms" className="hover:text-eticket-accent" target="_blank">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-eticket-accent" target="_blank">Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-eticket-accent" target="_blank">Politique de remboursement</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-eticket-accent" target="_blank">Politique des cookies</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Contact</h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span>Brazzaville, Congo</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:contact@e-ticket.com" className="hover:text-eticket-accent">contact@e-ticket.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+242056789012" className="hover:text-eticket-accent">+242 05 678 9012</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-700">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-300">
              &copy; {currentYear} E-ticket. Tous droits réservés.
            </p>
            <p className="mt-4 text-sm text-gray-300 md:mt-0">
              Conçu avec passion à Brazzaville, Congo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
