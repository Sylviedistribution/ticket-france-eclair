
import { Link } from "react-router-dom";
import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export function HeroSection({
  title = "Découvrez les meilleurs événements",
  subtitle = "Trouvez et réservez facilement des billets pour vos événements préférés"
}: HeroSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-eticket-500 to-eticket-600">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto text-white mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Rechercher un événement..." 
                  className="pl-10 h-12 w-full" 
                />
              </div>
              
              <div className="relative md:w-48">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select className="w-full h-12 pl-10 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-eticket-400">
                  <option>Tous les jours</option>
                  <option>Aujourd'hui</option>
                  <option>Cette semaine</option>
                  <option>Ce mois</option>
                  <option>Ce week-end</option>
                </select>
              </div>
              
              <Button className="h-12 px-8 whitespace-nowrap">
                Rechercher
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6 text-white">
          <Link to="/events?category=Concert" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition">
            Concerts
          </Link>
          <Link to="/events?category=Festival" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition">
            Festivals
          </Link>
          <Link to="/events?category=Conférence" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition">
            Conférences
          </Link>
          <Link to="/events?category=Formation" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition">
            Formations
          </Link>
          <Link to="/events?category=Sport" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition">
            Sports
          </Link>
        </div>
      </div>
      
      {/* Background circles decoration */}
      <div className="absolute top-0 -right-40 w-80 h-80 bg-eticket-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 w-60 h-60 bg-eticket-400/20 rounded-full blur-3xl"></div>
    </section>
  );
}
