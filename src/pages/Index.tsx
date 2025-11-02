
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/ui/hero-section";
import { EventsList } from "@/components/events/EventsList";
import { Button } from "@/components/ui/button";
import axios from "axios";

import { Event } from "@/types";
const Index = () => {
  // Dans une implémentation réelle, ces données viendraient de l'API Supabase
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events/");
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setEvents(data);
        console.log("Événements reçus :", data);

      } catch (error) {
        console.error("Erreur lors du chargement des événements :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Chargement des événements...</p>;
  }  
  // Séparation des événements par catégorie pour l'affichage
  const concertsEvents = events.filter(event => event.category === "Concert");
  const sportsEvents = events.filter(event => event.category === "Sport");
  const upcomingEvents = [...events].sort(
    (a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
  ).slice(0, 6);

  return (
    <Layout>
      <HeroSection />
      
      <EventsList 
        events={upcomingEvents} 
        title="Événements à venir"
        subtitle="Découvrez les prochains événements et réservez vos billets"
        limit={6}
        showMore={false}
      />

      {/* Section Catégories populaires */}
      <section className="bg-gray-50 py-12">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-eticket-500">Catégories populaires</h2>
          <p className="text-gray-600 mb-8">Explorez les événements par catégorie</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {EVENT_CATEGORIES.map((category) => (
              <Link 
                key={category} 
                to={`/events?category=${category}`}
                className="bg-white border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-xl font-bold text-eticket-500">{category}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section concerts */}
      {concertsEvents.length > 0 && (
        <EventsList 
          events={concertsEvents} 
          title="Concerts"
          subtitle="Ne manquez pas les concerts à venir"
          limit={3}
          showMore={false}
        />
      )}

      {/* Section Devenir organisateur */}
      <section className="py-16 bg-gradient-to-r from-eticket-500 to-eticket-600 text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vous organisez des événements ?</h2>
            <p className="text-lg mb-8 opacity-90">
              E-ticket vous aide à gérer vos événements, vendre des billets et maximiser votre visibilité.
            </p>
            <Link to="/auth/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-eticket-600">
                Devenir organisateur
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section événements sportifs */}
      {sportsEvents.length > 0 && (
        <EventsList 
          events={sportsEvents} 
          title="Événements sportifs"
          subtitle="Assistez aux meilleurs événements sportifs"
          limit={3}
          showMore={false}
        />
      )}

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-eticket-500">Prêt à découvrir plus d'événements ?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explorez tous nos événements à venir et sécurisez vos billets dès maintenant.
          </p>
          <Link to="/events">
            <Button size="lg">
              Voir tous les événements
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

import { EVENT_CATEGORIES } from "@/constants";
