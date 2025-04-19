
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EventsList } from "@/components/events/EventsList";
import { EventFilters } from "@/components/events/EventFilters";
import { MOCK_EVENTS } from "@/constants";
import { Event } from "@/types";

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  
  // Dans une implémentation réelle, ces données viendraient de l'API Supabase
  const allEvents = MOCK_EVENTS;

  // Initialiser les filtres à partir des paramètres d'URL
  const initialCategory = searchParams.get("category") || "";

  useEffect(() => {
    // Appliquer les filtres initiaux
    const initialFilters = {
      search: searchParams.get("search") || "",
      category: initialCategory,
      date: searchParams.get("date") || "",
      location: searchParams.get("location") || ""
    };
    applyFilters(initialFilters);
  }, [searchParams]);

  const applyFilters = (filters: any) => {
    // Mise à jour des paramètres d'URL
    const newSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        newSearchParams.set(key, value as string);
      }
    }
    setSearchParams(newSearchParams);
    
    // Filtrer les événements
    let events = [...allEvents];
    
    // Filtre par recherche (titre ou description)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      events = events.filter(event => 
        event.title.toLowerCase().includes(search) || 
        event.description.toLowerCase().includes(search)
      );
    }
    
    // Filtre par catégorie
    if (filters.category) {
      events = events.filter(event => event.category === filters.category);
    }
    
    // Filtre par lieu
    if (filters.location) {
      const location = filters.location.toLowerCase();
      events = events.filter(event => 
        event.location.toLowerCase().includes(location)
      );
    }
    
    // Filtre par date
    if (filters.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const thisWeekEnd = new Date(today);
      const daysUntilWeekend = 6 - today.getDay(); // Samedi est 6, Dimanche est 0
      thisWeekEnd.setDate(today.getDate() + daysUntilWeekend);
      
      const nextWeekStart = new Date(thisWeekEnd);
      nextWeekStart.setDate(thisWeekEnd.getDate() + 1);
      
      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
      
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      switch (filters.date) {
        case 'today':
          events = events.filter(event => {
            const eventDate = new Date(event.startDate);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === today.getTime();
          });
          break;
        case 'tomorrow':
          events = events.filter(event => {
            const eventDate = new Date(event.startDate);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === tomorrow.getTime();
          });
          break;
        case 'this-week':
          events = events.filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate >= today && eventDate <= thisWeekEnd;
          });
          break;
        case 'this-weekend':
          events = events.filter(event => {
            const eventDate = new Date(event.startDate);
            const day = eventDate.getDay();
            return (day === 0 || day === 6) && eventDate >= today && eventDate <= thisWeekEnd;
          });
          break;
        case 'next-week':
          events = events.filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
          });
          break;
        case 'this-month':
          events = events.filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate >= today && eventDate <= monthEnd;
          });
          break;
      }
    }
    
    setFilteredEvents(events);
  };

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-eticket-500">Événements</h1>
          <p className="text-gray-600 mb-6">Découvrez et réservez des billets pour les meilleurs événements</p>
          
          <EventFilters onFilter={applyFilters} />
          
          <EventsList 
            events={filteredEvents} 
            title=""
            showMore={true}
            limit={9}
            variant="horizontal"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Events;
