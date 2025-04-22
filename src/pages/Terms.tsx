
import React from "react";
import { Link } from "react-router-dom";

const Terms = () => (
  <div className="max-w-3xl mx-auto py-10 px-4 text-gray-900">
    <h1 className="text-3xl font-bold text-eticket-500 mb-6">Conditions Générales d’Utilisation</h1>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">1. Objet du service</h2>
      <p>
        E-ticket propose une plateforme numérique permettant aux organisateurs de publier des événements et aux utilisateurs d’acquérir des billets en ligne de manière sécurisée.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">2. Accès et inscription</h2>
      <p>
        L’accès à certains services nécessite la création d’un compte. L’utilisateur s’engage à fournir des informations exactes, complètes et à les mettre à jour régulièrement.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">3. Responsabilités des utilisateurs et organisateurs</h2>
      <p>
        Les utilisateurs sont responsables de l’utilisation de leurs identifiants.<br />
        Les organisateurs garantissent l’exactitude des informations relatives à leurs événements et au respect des lois applicables.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">4. Propriété intellectuelle</h2>
      <p>
        Tous les éléments présents sur la plateforme (textes, images, marques, logos) sont protégés par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">5. Limitation de responsabilité</h2>
      <p>
        E-ticket ne saurait être tenue responsable en cas de dysfonctionnement technique, d’indisponibilité du service ou de préjudice lié à l’utilisation de la plateforme.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">6. Modifications des CGU</h2>
      <p>
        La société se réserve le droit de modifier à tout moment les présentes conditions. Les utilisateurs seront informés de toute modification majeure.
      </p>
    </section>
    <div className="border-t pt-6 mt-8">
      <h3 className="text-lg font-semibold mb-2">Contact juridique</h3>
      <p>
        Pour toute question relative aux présentes conditions, veuillez nous écrire à :{" "}
        <a className="text-eticket-500 underline" href="mailto:legal@e-ticket.com">legal@e-ticket.com</a>
      </p>
      <p>
        Vous pouvez également utiliser notre <Link to="/contact" className="text-eticket-500 underline">formulaire de contact</Link>.
      </p>
    </div>
  </div>
);

export default Terms;
