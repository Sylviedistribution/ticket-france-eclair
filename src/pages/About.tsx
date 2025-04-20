
import { Layout } from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-eticket-500 mb-8">À propos de E-ticket</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            E-ticket est votre plateforme de billetterie en ligne de confiance, facilitant la découverte, 
            la réservation et la gestion d'événements à travers le Congo.
          </p>

          <h2 className="text-2xl font-semibold text-eticket-500 mt-8 mb-4">Notre Mission</h2>
          <p className="text-gray-600 mb-6">
            Simplifier l'accès aux événements culturels, sportifs et professionnels tout en offrant 
            une solution complète aux organisateurs pour gérer leurs événements.
          </p>

          <h2 className="text-2xl font-semibold text-eticket-500 mt-8 mb-4">Nos Services</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3">
            <li>Billetterie en ligne sécurisée</li>
            <li>Solutions de paiement mobile (MTN Money, Airtel Money)</li>
            <li>Génération de QR codes pour les billets</li>
            <li>Gestion complète des événements pour les organisateurs</li>
            <li>Support client dédié</li>
          </ul>

          <h2 className="text-2xl font-semibold text-eticket-500 mt-8 mb-4">Notre Équipe</h2>
          <p className="text-gray-600 mb-6">
            Une équipe passionnée de professionnels dévoués à faire de chaque événement un succès,
            en combinant expertise technique et service client de qualité.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
