
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, HeartHandshake } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-eticket-500 mb-4">À propos de E-ticket</h1>
            <p className="text-xl text-gray-600">
              Votre partenaire de confiance pour la billetterie en ligne au Congo
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="rounded-full bg-eticket-500 p-3">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-eticket-500 mb-4">Notre Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                      Simplifier l'accès aux événements culturels, sportifs et professionnels tout en offrant 
                      une solution complète aux organisateurs pour gérer leurs événements. Nous nous engageons 
                      à faciliter la découverte et la participation aux événements qui enrichissent la vie 
                      culturelle du Congo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-eticket-500 mb-8 text-center">Nos Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Billetterie Sécurisée",
                  description: "Paiements sécurisés et génération instantanée de QR codes",
                  badges: ["MTN Money", "Airtel Money"]
                },
                {
                  title: "Gestion d'Événements",
                  description: "Outils complets pour les organisateurs d'événements",
                  badges: ["Dashboard", "Analytics"]
                },
                {
                  title: "Support Dédié",
                  description: "Une équipe à votre écoute pour vous accompagner",
                  badges: ["24/7", "Multi-canal"]
                },
                {
                  title: "Technologies Innovantes",
                  description: "Solutions modernes pour une expérience optimale",
                  badges: ["QR Code", "Mobile"]
                }
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex gap-2">
                      {service.badges.map((badge, badgeIndex) => (
                        <Badge key={badgeIndex} variant="secondary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="rounded-full bg-eticket-500 p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-eticket-500 mb-4">Notre Équipe</h2>
                    <p className="text-gray-600 leading-relaxed">
                      Une équipe passionnée de professionnels dévoués à faire de chaque événement un succès,
                      en combinant expertise technique et service client de qualité. Nous sommes fiers de 
                      contribuer au développement de la scène événementielle congolaise.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <div>
            <h2 className="text-2xl font-semibold text-eticket-500 mb-8 text-center">Nos Valeurs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Award className="h-8 w-8 text-eticket-500" />,
                  title: "Excellence",
                  description: "Nous visons l'excellence dans chaque aspect de notre service"
                },
                {
                  icon: <HeartHandshake className="h-8 w-8 text-eticket-500" />,
                  title: "Confiance",
                  description: "La confiance est le fondement de toutes nos relations"
                },
                {
                  icon: <Target className="h-8 w-8 text-eticket-500" />,
                  title: "Innovation",
                  description: "Nous innovons constamment pour améliorer votre expérience"
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
