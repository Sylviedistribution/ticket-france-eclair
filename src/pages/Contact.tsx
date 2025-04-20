
import { Layout } from "@/components/layout/Layout";
import { MapPin, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Map from "@/components/Map";

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-eticket-500 mb-4">Contactez-nous</h1>
            <p className="text-xl text-gray-600">
              Notre équipe est là pour vous aider et répondre à toutes vos questions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Nos Coordonnées</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-eticket-500 p-2">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                        <p className="text-gray-600">123 Avenue de la République<br />Brazzaville, Congo</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-eticket-500 p-2">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <a href="mailto:contact@eticket.cg" className="text-eticket-400 hover:text-eticket-500">
                          contact@eticket.cg
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-eticket-500 p-2">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                        <a href="tel:+242123456789" className="text-eticket-400 hover:text-eticket-500">
                          +242 123 456 789
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <div className="h-[300px] rounded-lg overflow-hidden shadow-lg">
                <Map address="123 Avenue de la République, Brazzaville, Congo" />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
                  
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="name">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-eticket-400 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-eticket-400 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-eticket-400 focus:border-transparent"
                        required
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
