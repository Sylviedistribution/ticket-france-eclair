
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MOCK_EVENTS, MOCK_USERS } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { 
  CalendarDays, Users, Ticket, TrendingUp, ArrowUpCircle, Calendar, Clock, MapPin
} from "lucide-react";
import { User, Event } from "@/types";

const OrganizerDashboard = () => {
  // Dans une implémentation réelle, ces données viendraient de l'API Supabase
  // Simulons un organisateur connecté
  const currentUser = MOCK_USERS[1] as unknown as User;
  
  // Filtrer les événements pour l'organisateur connecté
  const organizerEvents = MOCK_EVENTS.filter(event => event.organizerId === currentUser.id);
  
  // Calculer les statistiques
  const totalEvents = organizerEvents.length;
  const totalTicketsSold = organizerEvents.reduce((acc, event) => acc + event.ticketsSold, 0);
  const totalRevenue = organizerEvents.reduce((acc, event) => acc + (event.ticketsSold * event.ticketPrice), 0);
  const upcomingEvents = organizerEvents.filter(event => new Date(event.startDate) > new Date()).length;
  
  // Données pour les graphiques
  const eventPerformanceData = organizerEvents.map(event => ({
    name: event.title.substring(0, 20),
    vendus: event.ticketsSold,
    revenu: event.ticketsSold * event.ticketPrice / 1000, // en milliers pour l'échelle
  }));

  const categoryData = () => {
    const categoryMap = new Map();
    organizerEvents.forEach(event => {
      if (categoryMap.has(event.category)) {
        categoryMap.set(event.category, categoryMap.get(event.category) + 1);
      } else {
        categoryMap.set(event.category, 1);
      }
    });
    
    return Array.from(categoryMap).map(([name, value]) => ({ name, value }));
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  return (
    <Layout currentUser={currentUser}>
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-eticket-500">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue, {currentUser.fullName}. Voici un aperçu de vos événements et performances.</p>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Événements</p>
                <p className="text-3xl font-bold">{totalEvents}</p>
              </div>
              <div className="bg-eticket-100 p-3 rounded-full">
                <CalendarDays className="h-6 w-6 text-eticket-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Billets Vendus</p>
                <p className="text-3xl font-bold">{totalTicketsSold}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Ticket className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenu Total</p>
                <p className="text-3xl font-bold">{totalRevenue.toLocaleString()} F</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">À venir</p>
                <p className="text-3xl font-bold">{upcomingEvents}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <ArrowUpCircle className="h-6 w-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Graphiques et analyses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Performance des événements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={eventPerformanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 70,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="vendus" name="Billets vendus" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="revenu" name="Revenu (K F)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribution par catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Événements récents et à venir */}
        <div className="mb-8">
          <Tabs defaultValue="upcoming">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-eticket-500">Mes événements</h2>
              <TabsList>
                <TabsTrigger value="upcoming">À venir</TabsTrigger>
                <TabsTrigger value="past">Passés</TabsTrigger>
                <TabsTrigger value="all">Tous</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upcoming" className="space-y-4">
              {organizerEvents
                .filter(event => new Date(event.startDate) > new Date())
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                .map(event => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:w-2/4">
                          <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                          <div className="space-y-1 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{formatDate(event.startDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-1/4 flex flex-col justify-between">
                          <div>
                            <p className="text-sm font-medium">Billets vendus</p>
                            <p className="text-xl font-bold">{event.ticketsSold} / {event.capacity}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}></div>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <p className="text-sm font-medium">Revenu</p>
                            <p className="text-xl font-bold">{(event.ticketsSold * event.ticketPrice).toLocaleString()} F</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {organizerEvents.filter(event => new Date(event.startDate) > new Date()).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Aucun événement à venir.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-4">
              {/* Événements passés */}
            </TabsContent>
            
            <TabsContent value="all" className="space-y-4">
              {/* Tous les événements */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizerDashboard;
