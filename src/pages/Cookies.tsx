
import React from "react";
import { Link } from "react-router-dom";

const CookiesPage = () => (
  <div className="max-w-3xl mx-auto py-10 px-4 text-gray-900">
    <h1 className="text-3xl font-bold text-eticket-500 mb-6">Politique des Cookies</h1>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">1. Types de cookies utilisés</h2>
      <p>
        Nous utilisons des cookies essentiels au fonctionnement du site, des cookies analytiques pour les statistiques et des cookies de sécurité.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">2. Finalité</h2>
      <p>
        Les cookies nous servent à améliorer l’expérience utilisateur, analyser la fréquentation et garantir la sécurité des transactions.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">3. Consentement et gestion des préférences</h2>
      <p>
        Lors de votre première visite, vous pouvez accepter ou refuser tout ou partie des cookies via le bandeau d’information. Vous pouvez ensuite modifier vos choix à tout moment dans les paramètres de votre navigateur.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">4. Désactivation des cookies</h2>
      <p>
        La désactivation partielle ou totale des cookies peut impacter certaines fonctionnalités du site. Pour plus d’informations, consultez la rubrique d’aide de votre navigateur.
      </p>
    </section>
    <div className="border-t pt-6 mt-8">
      <h3 className="text-lg font-semibold mb-2">Contact juridique</h3>
      <p>
        Pour toute question concernant la gestion des cookies ou le consentement, contactez :{" "}
        <a className="text-eticket-500 underline" href="mailto:legal@e-ticket.com">legal@e-ticket.com</a>
      </p>
      <p>
        Vous pouvez également utiliser notre <Link to="/contact" className="text-eticket-500 underline">formulaire de contact</Link>.
      </p>
    </div>
  </div>
);

export default CookiesPage;
