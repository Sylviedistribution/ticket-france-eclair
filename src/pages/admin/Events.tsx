
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Event } from "@/types";
import { Calendar, FileX, RefreshCw, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Mock events data
const mockEvents: Event[] = [
 

  {
    id: "2",
    title: "Conférence Tech Innovation",
    category: "business",
    event_date: "2025-07-20T09:00:00",
    location: "Centre de Conférences de Dakar",
    description: "Deux jours de conférences sur les dernières innovations technologiques.",
    banner_url: "/placeholder.svg",
    capacity: 800,
    organizerId: "3",
    createdAt: "2025-02-05T10:45:30",
    ticketCategories: [
      { id: "2-1", name: "Accès général", price: 120, quantity: 700, eventId: "2" },
      { id: "2-2", name: "Accès premium", price: 250, quantity: 100, eventId: "2" }
    ],
  },
  {
    id: "3",
    title: "Match de Football: Sénégal vs Côte d'Ivoire",
    category: "sports",
    event_date: "2025-08-05T19:30:00",
    location: "Stade Léopold Sédar Senghor",
    description: "Match de qualification pour la coupe d'Afrique des nations.",
    banner_url: "/placeholder.svg",
    capacity: 60000,
    organizerId: "4",
    organizerName: "Fédération Sénégalaise de Football",
    createdAt: "2025-03-12T09:15:45",
    ticketCategories: [
      { id: "3-1", name: "Tribune latérale", price: 30, quantity: 40000, eventId: "3" },
      { id: "3-2", name: "Tribune centrale", price: 50, quantity: 15000, eventId: "3" },
      { id: "3-3", name: "Loge VIP", price: 200, quantity: 5000, eventId: "3" }
    ],
    ticketsSold: 32500
  },
  {
    id: "4",
    title: "Exposition d'Art Contemporain",
    category: "culture",
    event_date: "2025-09-10T10:00:00",
    location: "Galerie Nationale d'Art",
    description: "Exposition des œuvres des artistes contemporains sénégalais.",
    banner_url: "/placeholder.svg",
    capacity: 500,
    organizerId: "5",
    organizerName: "Association des Artistes Contemporains",
    createdAt: "2025-04-03T14:20:10",
    ticketCategories: [
      { id: "4-1", name: "Entrée générale", price: 15, quantity: 450, eventId: "4" },
      { id: "4-2", name: "Visite guidée", price: 25, quantity: 50, eventId: "4" }
    ],
    ticketsSold: 285
  },
  {
    id: "5",
    title: "Séminaire en ligne: Marketing Digital",
    category: "education",
    event_date: "2025-10-15T14:00:00",
    location: "En ligne",
    isOnline: true,
    description: "Apprenez les stratégies de marketing digital les plus efficaces avec des experts.",
    banner_url: "/placeholder.svg",
    capacity: 1000,
    organizerId: "6",
    organizerName: "Digital Marketing Senegal",
    createdAt: "2025-05-20T11:30:00",
    ticketCategories: [
      { id: "5-1", name: "Accès standard", price: 25, quantity: 900, eventId: "5" },
      { id: "5-2", name: "Accès premium (avec consultation)", price: 75, quantity: 100, eventId: "5" }
    ],
    ticketsSold: 874
  }
];

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("list");
  const { toast } = useToast();

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.organizerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelEvent = () => {
    if (!selectedEvent) return;
    
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    
    toast({
      title: "Événement annulé",
      description: `${selectedEvent.title} a été annulé avec succès.`,
      variant: "destructive"
    });
    
    setCancelDialogOpen(false);
    setSelectedEvent(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Gestion des événements</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full sm:max-w-xs">
            <Input
              placeholder="Rechercher des événements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex rounded-md border p-1">
              <button
                className={`px-3 py-1.5 rounded-sm ${view === 'grid' ? 'bg-accent text-accent-foreground' : ''}`}
                onClick={() => setView('grid')}
              >
                <span className="sr-only">Grid view</span>
                <svg 
                  width="16" height="16" viewBox="0 0 24 24" fill="none" 
                  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <button
                className={`px-3 py-1.5 rounded-sm ${view === 'list' ? 'bg-accent text-accent-foreground' : ''}`}
                onClick={() => setView('list')}
              >
                <span className="sr-only">List view</span>
                <svg 
                  width="16" height="16" viewBox="0 0 24 24" fill="none" 
                  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                >
                  <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <Button variant="outline" onClick={() => setEvents([...mockEvents])}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </div>

        {view === 'list' ? (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Événement</TableHead>
                  <TableHead>Organisateur</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Billets</TableHead>
                  <TableHead>Revenus</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.category}</div>
                      </TableCell>
                      <TableCell>{event.organizerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{formatDate(event.event_date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{event.ticketsSold} / {event.capacity}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/events/${event.id}`}>
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 5C16.9706 5 21 12 21 12C21 12 16.9706 19 12 19C7.02944 19 3 12 3 12C3 12 7.02944 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedEvent(event);
                              setCancelDialogOpen(true);
                            }}
                          >
                            <FileX className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Aucun événement trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={event.banner_url} 
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {event.isOnline ? "En ligne" : "Présentiel"}
                      </span>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <h3 className="font-semibold text-lg truncate">{event.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {event.category} | {formatDate(event.event_date)}
                      </p>
                    </div>
                    <div className="flex items-center text-sm mb-2">
                      <User className="mr-1 h-4 w-4" /> 
                      <span>{event.organizerName}</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm font-medium">Billets vendus</div>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold">
                            {event.ticketsSold} / {event.capacity}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({Math.round((event.ticketsSold / event.capacity) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Revenus</div>
                        <div className="text-lg font-semibold">
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 flex justify-between">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/events/${event.id}`}>Détails</Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        setSelectedEvent(event);
                        setCancelDialogOpen(true);
                      }}
                    >
                      <FileX className="mr-1 h-4 w-4" />
                      Annuler
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">Aucun événement trouvé</h3>
                <p className="text-muted-foreground">Modifiez vos critères de recherche pour trouver des événements.</p>
              </div>
            )}
          </div>
        )}

        {/* Cancel Event Dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Annuler l'événement</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir annuler l'événement "{selectedEvent?.title}" ? Cette action notifiera tous les participants et initiera le processus de remboursement.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="secondary" 
                onClick={() => setCancelDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button 
                variant="destructive"
                onClick={handleCancelEvent}
              >
                Confirmer l'annulation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AdminEvents;
