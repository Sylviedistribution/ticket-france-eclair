
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS, MOCK_USERS } from "@/constants";
import { Calendar, Clock, MapPin, Ticket, Share2, User } from "lucide-react";
import { PaymentModal } from "@/components/payment/PaymentModal";

const EventDetail = () => {
  const { id } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Trouver l'événement correspondant à l'ID
  const event = MOCK_EVENTS.find(event => event.id === id);
  
  // S'il n'y a pas d'événement correspondant, afficher un message d'erreur
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
  
  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  };
  
  // Formater l'heure pour l'affichage
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };
  
  // Calculer le montant total
  const totalAmount = event.ticketPrice * ticketCount;
  
  // Gérer l'ouverture du modal de paiement
  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section principale */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{event.category}</Badge>
                {event.isOnline && <Badge variant="outline">En ligne</Badge>}
              </div>
              
              <h1 className="text-3xl font-bold mb-2 text-eticket-500">{event.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <User className="w-4 h-4 mr-1" />
                <span>Organisé par {event.organizerName}</span>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-96 object-cover"
              />
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
            <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-2xl font-bold text-eticket-500">
                  {event.ticketPrice.toLocaleString()} F
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-eticket-500 mt-0.5" />
                  <div>
                    <div className="font-medium">{formatDate(event.startDate)}</div>
                    {event.endDate && (
                      <div className="text-sm text-gray-600">
                        jusqu'au {formatDate(event.endDate)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-eticket-500 mt-0.5" />
                  <div>
                    <div className="font-medium">{formatTime(event.startDate)}</div>
                    {event.endDate && (
                      <div className="text-sm text-gray-600">
                        jusqu'à {formatTime(event.endDate)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-eticket-500 mt-0.5" />
                  <div>
                    <div className="font-medium">
                      {event.isOnline ? "Événement en ligne" : event.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Ticket className="w-5 h-5 text-eticket-500 mt-0.5" />
                  <div>
                    <div className="font-medium">
                      {event.ticketsSold} / {event.capacity} billets vendus
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-eticket-500 h-2 rounded-full" 
                        style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Nombre de billets</div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      disabled={ticketCount <= 1}
                      onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{ticketCount}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      disabled={ticketCount >= 10}
                      onClick={() => setTicketCount(prev => Math.min(10, prev + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <div className="font-medium">Total</div>
                  <div className="font-bold text-xl">
                    {totalAmount.toLocaleString()} F
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={handleOpenPaymentModal}
                  disabled={event.ticketsSold >= event.capacity}
                >
                  {event.ticketsSold >= event.capacity ? "Complet" : "Acheter des billets"}
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
        ticketCount={ticketCount}
      />
    </Layout>
  );
};

export default EventDetail;
