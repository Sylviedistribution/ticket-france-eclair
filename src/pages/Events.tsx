import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EventsList } from "@/components/events/EventsList";
import { EventFilters } from "@/components/events/EventFilters";
import axios from "axios";
import { Event } from "@/types";

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]); // Contiendra tous les événements depuis l'API

  const initialCategory = searchParams.get("category") || "";

  // Chargement des événements depuis l'API au montage du composant
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events/"); // Route API pour récupérer les événements
        const events = Array.isArray(response.data.data) ? response.data.data : [];
        setAllEvents(events); // ✅ mise à jour du state
      } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      }
    };

    fetchEvents();
  }, []);

  // Appliquer les filtres quand les paramètres d'URL changent ou les données API arrivent
  useEffect(() => {
    const initialFilters = {
      search: searchParams.get("search") || "",
      category: initialCategory,
      date: searchParams.get("date") || "",
      location: searchParams.get("location") || "",
    };
    applyFilters(initialFilters);
  }, [searchParams, allEvents]); // Observer `allEvents` pour ne pas appliquer les filtres avant le chargement

  const applyFilters = (filters: any) => {
    // Mise à jour des paramètres dans l'URL
    const newSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) newSearchParams.set(key, value as string);
    }
    setSearchParams(newSearchParams);

    let events = [...allEvents]; // Cloner les événements récupérés depuis l'API

    // Filtrer par recherche
    if (filters.search) {
      const search = filters.search.toLowerCase();
      events = events.filter((event) =>
        event.title.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search)
      );
    }

    // Filtrer par catégorie
    if (filters.category) {
      events = events.filter((event) => event.category === filters.category);
    }

    // Filtrer par lieu
    if (filters.location) {
      const location = filters.location.toLowerCase();
      events = events.filter((event) =>
        event.location.toLowerCase().includes(location)
      );
    }

    // Filtrer par date (logique identique à la tienne)
    if (filters.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const thisWeekEnd = new Date(today);
      const daysUntilWeekend = 6 - today.getDay();
      thisWeekEnd.setDate(today.getDate() + daysUntilWeekend);

      const nextWeekStart = new Date(thisWeekEnd);
      nextWeekStart.setDate(thisWeekEnd.getDate() + 1);

      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      switch (filters.date) {
        case "today":
          events = events.filter((event) => {
            const eventDate = new Date(event.event_date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === today.getTime();
          });
          break;
        case "tomorrow":
          events = events.filter((event) => {
            const eventDate = new Date(event.event_date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === tomorrow.getTime();
          });
          break;
        case "this-week":
          events = events.filter((event) => {
            const eventDate = new Date(event.event_date);
            return eventDate >= today && eventDate <= thisWeekEnd;
          });
          break;
        case "this-weekend":
          events = events.filter((event) => {
            const eventDate = new Date(event.event_date);
            const day = eventDate.getDay();
            return (day === 0 || day === 6) && eventDate >= today && eventDate <= thisWeekEnd;
          });
          break;
        case "next-week":
          events = events.filter((event) => {
            const eventDate = new Date(event.event_date);
            return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
          });
          break;
        case "this-month":
          events = events.filter((event) => {
            const eventDate = new Date(event.event_date);
            return eventDate >= today && eventDate <= monthEnd;
          });
          break;
      }
    }

    setFilteredEvents(events); // Met à jour les événements filtrés
  };

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-eticket-500">Événements</h1>
          <p className="text-gray-600 mb-6">Découvrez et réservez des billets pour les meilleurs événements</p>

          <EventFilters onFilter={applyFilters} />

          {/* Passer filteredEvents à EventsList */}
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
