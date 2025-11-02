
import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => (
  <div className="max-w-3xl mx-auto py-10 px-4 text-gray-900">
    <h1 className="text-3xl font-bold text-eticket-500 mb-6">Politique de Confidentialité</h1>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">1. Données collectées</h2>
      <p>
        Nous collectons uniquement les données strictement nécessaires : identité, coordonnées, informations de paiement et historique d’achats.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">2. Finalité du traitement</h2>
      <p>
        Vos données sont utilisées pour la gestion des comptes, la délivrance de billets, le service client, et l’envoi d’informations sur les événements.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">3. Durée de conservation</h2>
      <p>
        Les données sont conservées pendant la durée strictement nécessaire à la finalité définie, sauf obligation légale contraire.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">4. Droits des utilisateurs</h2>
      <p>
        Vous pouvez accéder à vos données, les rectifier, demander leur suppression ou opposer à leur traitement en contactant notre service juridique.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">5. Cookies et traceurs</h2>
      <p>
        Des cookies techniques et analytiques sont susceptibles d’être déposés lors de votre navigation, conformément à notre politique de cookies.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">6. Sécurité des données</h2>
      <p>
        Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles afin de protéger vos données personnelles contre toute tentative d’accès non autorisé.
      </p>
    </section>
    <div className="border-t pt-6 mt-8">
      <h3 className="text-lg font-semibold mb-2">Contact juridique</h3>
      <p>
        Pour toute question concernant vos données ou l’exercice de vos droits, veuillez écrire à :{" "}
        <a className="text-eticket-500 underline" href="mailto:legal@e-ticket.com">legal@e-ticket.com</a>
      </p>
      <p>
        Vous pouvez aussi nous contacter via notre <Link to="/contact" className="text-eticket-500 underline">formulaire de contact</Link>.
      </p>
    </div>
  </div>
);

export default Privacy;
