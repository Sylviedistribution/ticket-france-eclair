
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Share2, Users, TicketIcon, Info, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventsList } from "@/components/events/EventsList";
import { MOCK_EVENTS } from "@/constants";
import { Event } from "@/types";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [similarEvents, setSimilarEvents] = useState<Event[]>([]);
  const [selectedTicketCategory, setSelectedTicketCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Dans une implémentation réelle, ces données viendraient de l'API Supabase
  useEffect(() => {
    // Trouver l'événement actuel
    const currentEvent = MOCK_EVENTS.find(event => event.id === id) || null;
    setEvent(currentEvent);
    
    // Si l'événement est trouvé, définir la catégorie de ticket par défaut
    if (currentEvent && currentEvent.ticketCategories.length > 0) {
      setSelectedTicketCategory(currentEvent.ticketCategories[0].id);
    }

    // Trouver des événements similaires (même catégorie)
    if (currentEvent) {
      const similar = MOCK_EVENTS.filter(
        e => e.id !== id && e.category === currentEvent.category
      ).slice(0, 3);
      setSimilarEvents(similar);
    }
  }, [id]);

  if (!event) {
    return (
      <Layout>
        <div className="container px-4 py-12 mx-auto text-center">
          <p>Chargement de l'événement...</p>
        </div>
      </Layout>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  const selectedCategory = event.ticketCategories.find(
    cat => cat.id === selectedTicketCategory
  );
  
  const ticketPrice = selectedCategory ? selectedCategory.price : event.ticketPrice;
  const totalPrice = ticketPrice * quantity;

  const handleBuyTickets = () => {
    // Dans une implémentation réelle, rediriger vers la page de checkout
    // ou afficher un modal de paiement
    console.log("Achat de billets:", {
      event,
      categoryId: selectedTicketCategory,
      quantity,
      totalPrice
    });
  };

  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-gradient-to-b from-eticket-500 to-eticket-600 pt-8 pb-12 text-white">
        <div className="container px-4 mx-auto">
          <div className="mb-6">
            <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour aux événements
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="flex flex-wrap gap-y-4 gap-x-6 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-eticket-accent" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-eticket-accent" />
                  <span>{formatTime(event.startDate)}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-eticket-accent" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-eticket-accent" />
                  <span>Organisé par {event.organizerName}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <Button variant="outline" className="gap-2 border-white/30 hover:bg-white/10">
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Event details */}
          <div className="lg:w-2/3">
            <div className="mb-8">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            
            <Tabs defaultValue="description">
              <TabsList className="mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="info">Informations</TabsTrigger>
                <TabsTrigger value="location">Lieu</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-eticket-500">Description de l'événement</h2>
                <div className="prose max-w-none">
                  <p className="mb-4">{event.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="info" className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-eticket-500">Informations importantes</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-eticket-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Date et heure</h3>
                      <p>{formatDate(event.startDate)} à {formatTime(event.startDate)}</p>
                      <p>Fin prévue : {formatTime(event.endDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-3 text-eticket-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Organisateur</h3>
                      <p>{event.organizerName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <TicketIcon className="h-5 w-5 mr-3 text-eticket-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Politique de remboursement</h3>
                      <p>Les billets ne sont pas remboursables, sauf en cas d'annulation de l'événement.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Info className="h-5 w-5 mr-3 text-eticket-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Informations supplémentaires</h3>
                      <p>Veuillez présenter votre QR code à l'entrée. Arrivez au moins 30 minutes avant le début.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-eticket-500">Lieu de l'événement</h2>
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">{event.location}</h3>
                  <p className="text-gray-600 mb-4">
                    {event.isOnline ? "Événement en ligne" : "Événement présentiel"}
                  </p>
                  
                  {!event.isOnline && (
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Carte de localisation</p>
                      {/* Dans une implémentation réelle, intégrer une carte */}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column - Buy tickets */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
              <h2 className="text-xl font-bold mb-4 text-eticket-500">Réserver vos billets</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Type de billet
                </label>
                <select 
                  value={selectedTicketCategory}
                  onChange={(e) => setSelectedTicketCategory(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-eticket-400"
                >
                  {event.ticketCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} - {category.price.toLocaleString()} F
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Quantité
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1 border rounded-l-md bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center p-1 border-y focus:outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3 py-1 border rounded-r-md bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>Prix unitaire:</span>
                  <span>{ticketPrice.toLocaleString()} F</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantité:</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>{totalPrice.toLocaleString()} F</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleBuyTickets}
              >
                <TicketIcon className="h-4 w-4 mr-2" />
                Acheter des billets
              </Button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Un QR code unique sera généré après votre paiement
              </p>
            </div>
          </div>
        </div>
        
        {/* Similar events */}
        {similarEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-eticket-500">Événements similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarEvents.map(event => (
                <EventsList
                  key="similar-events" 
                  events={similarEvents} 
                  title=""
                  showMore={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventDetail;
