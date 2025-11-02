import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Eye, Plus, Ticket, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Event } from "@/types";

const OrganizerEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/events/", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log("Réponse API:", response.data.data);
      const events = Array.isArray(response.data.data) ? response.data.data : [];

      // Corriger ici selon le format de la réponse
      setEvents(events);

    } catch (error) {
      console.error("Erreur lors du chargement des événements :", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId: number) => {
  if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/api/events/delete/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    // Supprimer l'événement du state local après suppression
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement :", error);
  }
};


  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);
  };


  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-eticket-500">Mes événements</h1>
            <p className="text-gray-600">Gérer tous vos événements</p>
          </div>
          <Button onClick={() => navigate('/organizer/events/create')} className="flex items-center gap-2">
            <Plus size={18} /> Créer un événement
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Liste des événements</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Événement</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead>Date even.</TableHead>
                  <TableHead>Start time</TableHead>
                  <TableHead>End time</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Bannière</TableHead>
                  <TableHead>Actif</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{formatDate(event.created_at)}</TableCell>
                    <TableCell>{formatDate(event.event_date)}</TableCell>
                    <TableCell>{event.start_time}</TableCell>
                    <TableCell>{event.end_time}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>
                      {event.banner_url ? (
                        <img src={event.banner_url} alt="Bannière" className="w-20 h-10 object-cover rounded" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{event.is_active ? "Oui" : "Non"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end/organizer/events/${event.id}/tickets gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/events/${event.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/organizer/events/${event.id}/edit`}><Edit className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`${event.id}/tickets`}><Ticket className="h-4 w-4 text-amber-600" /></Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => deleteEvent(event.id)}>
                          <Trash2 className="h-4 w-4 text-red-500"/>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {events.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                      Aucun événement trouvé. 
                      <Link to="/organizer/events/create" className="ml-2 text-eticket-500 hover:underline">
                        Créer votre premier événement
                      </Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizerEvents;
