
import { Layout } from "@/components/layout/Layout";
import { MapPin, Mail, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-eticket-500 mb-8">Contactez-nous</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Nos Coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-eticket-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="text-gray-600">123 Avenue de la République<br />Brazzaville, Congo</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-eticket-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@eticket.cg</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-eticket-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-gray-600">+242 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Info className="w-6 h-6 text-eticket-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Horaires</h3>
                  <p className="text-gray-600">Lundi - Vendredi: 8h - 18h<br />Samedi: 9h - 13h</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>

              <Button type="submit" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
