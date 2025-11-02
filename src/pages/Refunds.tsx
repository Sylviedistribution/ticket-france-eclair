import React from "react";
import { Link } from "react-router-dom";

const Refund = () => (
  <div className="max-w-3xl mx-auto py-10 px-4 text-gray-900">
    <h1 className="text-3xl font-bold text-eticket-500 mb-6">Politique de Remboursement</h1>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">1. Cas d’éligibilité</h2>
      <p>
        Un remboursement peut être demandé en cas d’annulation d’événement par l’organisateur, d’erreur de facturation, ou de double paiement. Toute autre situation sera examinée au cas par cas.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">2. Procédure de demande</h2>
      <p>
        Les demandes de remboursement doivent être adressées par écrit, accompagnées des justificatifs nécessaires, à notre équipe support via notre adresse de contact ou notre formulaire en ligne.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">3. Délais de traitement</h2>
      <p>
        Chaque demande est traitée dans un délai maximum de 14 jours ouvrés à compter de la réception de tous les éléments requis.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">4. Cas de non-remboursement</h2>
      <p>
        Aucun remboursement n’est accordé si l’événement a bien eu lieu, en cas de perte ou de vol du billet, ou si la demande n’est pas conforme à la procédure.
      </p>
    </section>
    <div className="border-t pt-6 mt-8">
      <h3 className="text-lg font-semibold mb-2">Contact juridique</h3>
      <p>
        Pour toute demande de remboursement ou question juridique, veuillez nous écrire à :{" "}
        <a className="text-eticket-500 underline" href="mailto:legal@e-ticket.com">legal@e-ticket.com</a>
      </p>
      <p>
        Notre <Link to="/contact" className="text-eticket-500 underline">formulaire de contact</Link> est également disponible.
      </p>
    </div>
  </div>
);

export default Refund;
