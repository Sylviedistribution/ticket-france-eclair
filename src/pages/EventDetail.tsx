import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Ticket, Share2, User } from "lucide-react";
import { PaymentModal } from "@/components/payment/PaymentModal";
import axios from "axios";
import { Event } from "@/types";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.locale("fr"); // Définit la locale globale à "fr"


const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [currency, setCurrency] = useState<string>("null");
  const [loading, setLoading] = useState(true);
  const [ticketCounts, setTicketCounts] = useState<{ [ticketId: number]: number }>({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`);
        setEvent(response.data.data);

        // Initialiser les quantités à 0 pour chaque catégorie
        const initialCounts: { [ticketId: number]: number } = {};
        response.data.data.ticket_categories?.forEach((ticket: any) => {
          initialCounts[ticket.id] = 0;
        });
        setTicketCounts(initialCounts);

         // Récupérer la currency du premier ticket si disponible
        if (response.data.data.ticket_categories?.length > 0) {
          setCurrency(response.data.data.ticket_categories[0].currency);
        }


      } catch (error) {
        console.error("Erreur lors du chargement de l'événement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 py-8 mx-auto text-center">
          <p>Chargement...</p>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container px-4 py-8 mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
          <p>L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Date non définie";
    const date = dayjs(dateString);
    return date.isValid() ? date.format("dddd D MMMM YYYY") : "Date invalide";
  };

  const formatTime = (timeString: string) => {
    const time = dayjs(timeString, ["HH:mm:ss"]);
    return time.isValid() ? time.format("HH:mm") : "--:--";
  };

  // Calcul du total
  const totalAmount = event.ticket_categories?.reduce((acc, ticket) => {
    const count = ticketCounts[ticket.id] || 0;
    return acc + ticket.price * count;
  }, 0) ?? 0;

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  // Juste avant le return de <PaymentModal />
  const selectedTickets = Object.entries(ticketCounts)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => {
      const category = event.ticket_categories.find(cat => cat.id === Number(id));
      return category
        ? { id: category.id, number: count }
        : null;
    })
    .filter(Boolean);

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{event.category}</Badge>
                {event.isOnline && <Badge variant="outline">En ligne</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2 text-eticket-500">{event.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <User className="w-4 h-4 mr-1" />
                <span>Organisé par {event.organizer_name}</span>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden mb-6">
              <img src={event.banner_url} alt={event.title} className="w-full h-96 object-cover" />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">À propos de cet événement</h2>
              <div className="prose max-w-none">
                <p>{event.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-24 space-y-6">
              <div>
                <div className="font-medium">Categorie de tickets</div>

                {event.ticket_categories?.length > 0 ? (
                  event.ticket_categories.map((ticket) => (
                    <div key={ticket.id} className="mb-4 border-b pb-4">
                      <div className="text-sm text-gray-600 mb-2">{ticket.name}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-eticket-500 font-medium">{ticket.price.toLocaleString()} {ticket.currency}</span>
                        <div className="flex gap-2 items-center">
                          <Ticket className="w-5 h-5 text-eticket-500 mt-0.5" />

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              setTicketCounts((prev) => ({
                                ...prev,
                                [ticket.id]: Math.max(0, (prev[ticket.id] ?? 0) - 1),
                              }))
                            }
                          >
                            -
                          </Button>
                          <span>{ticketCounts[ticket.id] || 0}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              setTicketCounts((prev) => ({
                                ...prev,
                                [ticket.id]: Math.min(5, (prev[ticket.id] ?? 0) + 1),
                              }))
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Aucune catégorie de ticket disponible.</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-eticket-500 mt-0.5" />
                  <div><div className="font-medium">{formatDate(event.event_date)}</div></div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-eticket-500 mt-0.5" />
                  <div className="flex gap-4">
                    {formatTime(event.start_time)} - {formatTime(event.end_time)}

                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-eticket-500 mt-0.5" />
                  <div><div className="font-medium">{event.isOnline ? "Événement en ligne" : event.location}</div></div>
                </div>

                <div className="flex items-start gap-3">
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <div className="font-medium">Total</div>
                  <div className="font-bold text-xl">{totalAmount.toLocaleString()} F</div>
                </div>

                <Button className="w-full" size="lg" onClick={handleOpenPaymentModal} disabled={totalAmount === 0}>
                  Acheter
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Share2 className="mr-2 h-4 w-4" /> Partager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        eventTitle={event.title}
        totalAmount={totalAmount}
        ticketCount={Object.values(ticketCounts).reduce((a, b) => a + b, 0)}
        currency={currency}
        ticketBought={selectedTickets.reduce((acc, ticket) => {
          if (ticket) acc[ticket.id] = ticket.number;
          return acc;
        }, {} as Record<string, number>)} 
        />

    </Layout>
  );
};

export default EventDetail;
