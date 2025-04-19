
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
  variant?: "default" | "horizontal";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Check if the event is today
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isHorizontal = variant === "horizontal";

  return (
    <div 
      className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
        isHorizontal ? "flex flex-col md:flex-row" : ""
      }`}
    >
      <Link 
        to={`/events/${event.id}`}
        className={isHorizontal ? "md:w-1/3" : ""}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isToday(event.startDate) && (
            <Badge className="absolute top-2 left-2 bg-eticket-accent">
              Aujourd'hui
            </Badge>
          )}
          <Badge className="absolute top-2 right-2">
            {event.category}
          </Badge>
        </div>
      </Link>

      <div className={`p-4 ${isHorizontal ? "md:w-2/3" : ""}`}>
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            <Link to={`/events/${event.id}`} className="hover:text-eticket-400">
              {event.title}
            </Link>
          </h3>
          <span className="font-bold text-eticket-500">
            {event.ticketPrice.toLocaleString()} F
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1 text-eticket-400" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1 text-eticket-400" />
            <span>{formatTime(event.startDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-eticket-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Ticket className="w-4 h-4 mr-1 text-eticket-400" />
            <span className="truncate">Par {event.organizerName}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={`/events/${event.id}`}>
            <Button variant="outline">Détails</Button>
          </Link>
          <Link to={`/events/${event.id}/tickets`}>
            <Button>Réserver</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
