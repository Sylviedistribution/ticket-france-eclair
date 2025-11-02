import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Ticket, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


interface EventCardProps {
  event: Event;
  variant?: "default" | "horizontal";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const isHorizontal = variant === "horizontal";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Date invalide";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (timeString: string) => {
    const time = dayjs(timeString, ["HH:mm:ss"]);
    return time.isValid() ? time.format("HH:mm") : "--:--";
  };


  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${isHorizontal ? "flex flex-col md:flex-row" : ""}`}>
      <Link to={`/events/${event.id}`} className={isHorizontal ? "md:w-1/3" : ""}>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={event.banner_url || "/placeholder.jpg"}
            alt={event.title || "Événement"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isToday(event.event_date) && (
            <Badge className="absolute top-2 left-2 bg-eticket-accent">Aujourd'hui</Badge>
          )}
          <Badge className="absolute top-2 right-2">{event.category}</Badge>
        </div>
      </Link>

      <div className={`p-4 ${isHorizontal ? "md:w-2/3" : ""}`}>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <Link to={`/events/${event.id}`} className="hover:text-eticket-400">
            {event.title}
          </Link>
        </h3>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-eticket-400" /> {formatDate(event.event_date)}</div>
          <div className="flex items-center"><Clock className="w-4 h-4 mr-1 text-eticket-400" />   {formatTime(event.start_time)} - {formatTime(event.end_time)}</div>
          <div className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-eticket-400" /> {event.location}</div>
          <div className="flex items-center"><User className="w-4 h-4 mr-1 text-eticket-400" /> Par {event.organizer_name}</div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={`/events/${event.id}`}><Button>Réserver</Button></Link>
        </div>
      </div>
    </div>
  );
}