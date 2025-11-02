import { useEffect, useState } from "react";
import { Event } from "@/types";
import { EventCard } from "./EventCard";
import { Button } from "@/components/ui/button";

interface EventsListProps {
  title?: string;
  events: Event[],  // Ici, on prend les événements passés par le parent
  subtitle?: string;
  limit?: number;
  showMore?: boolean;
  variant?: "default" | "horizontal";
}

export function EventsList({
  title = "Événements à venir",
  events,
  subtitle,
  limit = 6,
  showMore = true,
  variant = "default",
}: EventsListProps) {
  const [displayLimit, setDisplayLimit] = useState(limit);

  const displayedEvents = events.slice(0, displayLimit);
  const hasMore = events.length > displayLimit;

  const loadMore = () => {
    setDisplayLimit(prevLimit => prevLimit + limit);
  };

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        {title && <h2 className="text-2xl md:text-3xl font-bold mb-2 text-eticket-500">{title}</h2>}
        {subtitle && <p className="text-gray-600 mb-8">{subtitle}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map(event => (
            <EventCard key={event.id} event={event} variant={variant} />
          ))}
        </div>

        {showMore && hasMore && (
          <div className="mt-10 text-center">
            <Button onClick={loadMore} variant="outline" size="lg">
              Voir plus d'événements
            </Button>
          </div>
        )}

        {displayedEvents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun événement disponible.</p>
          </div>
        )}
      </div>
    </section>
  );
}
