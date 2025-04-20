
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MOCK_EVENTS, MOCK_USERS } from "@/constants";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Event, User } from "@/types";
import { Calendar, Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const OrganizerEvents = () => {
  const navigate = useNavigate();
  
  // Dans une implémentation réelle, ces données viendraient de l'API
  const currentUser = MOCK_USERS[1] as unknown as User;
  
  // Filtrer les événements pour l'organisateur connecté
  const organizerEvents = MOCK_EVENTS.filter(event => event.organizerId === currentUser.id);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);
  };

  // Calculer le total des revenus
  const totalRevenue = organizerEvents.reduce(
    (acc, event) => acc + (event.ticketsSold * event.ticketPrice), 
    0
  );
  
  return (
    <Layout currentUser={currentUser}>
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
            <p className="text-sm text-gray-500">Total des recettes: {totalRevenue.toLocaleString()} F</p>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Événement</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead className="text-right">Prix Billet</TableHead>
                  <TableHead className="text-right">Vendus</TableHead>
                  <TableHead className="text-right">Recette</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizerEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{formatDate(event.startDate)}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell className="text-right">{event.ticketPrice.toLocaleString()} F</TableCell>
                    <TableCell className="text-right">{event.ticketsSold} / {event.capacity}</TableCell>
                    <TableCell className="text-right">{(event.ticketsSold * event.ticketPrice).toLocaleString()} F</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/events/${event.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/organizer/events/${event.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {organizerEvents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
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
