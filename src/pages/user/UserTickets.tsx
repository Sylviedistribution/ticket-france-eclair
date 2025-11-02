
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_TICKETS, MOCK_USERS, MOCK_EVENTS } from "@/constants";
import { Calendar, Clock, MapPin, Download, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { User } from "@/types";

const UserTickets = () => {
  const [filter, setFilter] = useState<"active" | "used" | "all">("all");
  
  // Dans une implémentation réelle, ces données viendraient de l'API Supabase
  
  // Simulons un utilisateur connecté
  const currentUser = MOCK_USERS[0] as unknown as User;
  
  // Filtrer les tickets pour l'utilisateur connecté
  const userTickets = MOCK_TICKETS.filter(ticket => ticket.userId === currentUser.id);
  
  // Filtrer selon l'onglet actif
  const filteredTickets = filter === "all" 
    ? userTickets 
    : userTickets.filter(ticket => ticket.status === filter);

  // Trouver les détails complets d'un événement
  const getEventDetails = (eventId: string) => {
    return MOCK_EVENTS.find(event => event.id === eventId);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  // Générer un PDF pour le ticket (simulé)
  const downloadTicket = (ticketId: string) => {
    console.log(`Téléchargement du ticket ${ticketId}`);
    // Dans une implémentation réelle, générer un PDF
  };

  // Partager un ticket (simulé)
  const shareTicket = (ticketId: string) => {
    console.log(`Partage du ticket ${ticketId}`);
    // Dans une implémentation réelle, ouvrir un modal de partage
  };

  // Obtenir la classe CSS en fonction du statut du ticket
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Traduire le statut en français
  const translateStatus = (status: string) => {
    switch (status) {
      case "active":
        return "Actif";
      case "used":
        return "Utilisé";
      case "cancelled":
        return "Annulé";
      case "refunded":
        return "Remboursé";
      default:
        return status;
    }
  };

  return (
    <Layout currentUser={currentUser}>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-eticket-500">Mes Tickets</h1>
          <p className="text-gray-600 mb-6">Gérez et visualisez tous vos tickets d'événements</p>
          
          <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="active">Actifs</TabsTrigger>
              <TabsTrigger value="used">Utilisés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {filteredTickets.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Aucun ticket disponible.</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => {
                  const event = getEventDetails(ticket.eventId);
                  
                  return (
                    <div key={ticket.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {/* Informations du ticket */}
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold mb-2">{ticket.eventTitle}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(ticket.status)}`}>
                              {translateStatus(ticket.status)}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-500 mb-4">
                            Type: {ticket.categoryName}
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            {event && (
                              <>
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-2 text-eticket-400" />
                                  <span>{formatDate(event.startDate)}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-eticket-400" />
                                  <span>{formatTime(event.startDate)}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-eticket-400" />
                                  <span>{event.location}</span>
                                </div>
                              </>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button
                              onClick={() => downloadTicket(ticket.id)}
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </Button>
                            <Button
                              onClick={() => shareTicket(ticket.id)}
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Partager
                            </Button>
                          </div>
                        </div>
                        
                        {/* QR Code */}
                        <div className="md:w-1/3 bg-gray-50 flex flex-col items-center justify-center p-6 border-t md:border-t-0 md:border-l">
                          <div className="bg-white p-2 rounded-lg shadow-sm mb-2">
                            <QRCodeSVG
                              value={`https://e-ticket.com/verify/${ticket.id}`}
                              size={150}
                              level="H"
                              includeMargin={true}
                            />
                          </div>
                          <p className="text-xs text-center text-gray-500 mt-2">
                            Présentez ce QR code à l'entrée de l'événement
                          </p>
                          <p className="font-mono text-xs text-center text-gray-500 mt-2">
                            #{ticket.id.substring(0, 8)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-6">
              {/* Le contenu est filtré via setFilter */}
            </TabsContent>
            
            <TabsContent value="used" className="space-y-6">
              {/* Le contenu est filtré via setFilter */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default UserTickets;
