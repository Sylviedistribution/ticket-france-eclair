
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Users, Calendar, Ticket, DollarSign } from "lucide-react";

// Mock data for dashboard
const dashboardStats: DashboardStats = {
  totalEvents: 145,
  totalTicketsSold: 3678,
  totalRevenue: 89450,
  upcomingEvents: 38
};

const eventsByCategory = [
  { name: "Concerts", value: 45 },
  { name: "Conférences", value: 30 },
  { name: "Sports", value: 25 },
  { name: "Expositions", value: 20 },
  { name: "Autres", value: 25 },
];

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Fév", revenue: 5000 },
  { month: "Mar", revenue: 6000 },
  { month: "Avr", revenue: 8000 },
  { month: "Mai", revenue: 10000 },
  { month: "Juin", revenue: 15000 },
];

const COLORS = ["#8B5CF6", "#D946EF", "#F97316", "#0EA5E9", "#403E43"];

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord administrateur</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Utilisateurs</p>
                  <h3 className="text-2xl font-bold">1,254</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Événements</p>
                  <h3 className="text-2xl font-bold">{dashboardStats.totalEvents}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Ticket className="h-6 w-6 text-orange-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Billets vendus</p>
                  <h3 className="text-2xl font-bold">{dashboardStats.totalTicketsSold}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenus</p>
                  <h3 className="text-2xl font-bold">{dashboardStats.totalRevenue.toLocaleString()} €</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="apercu" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="apercu">Aperçu</TabsTrigger>
            <TabsTrigger value="tendances">Tendances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apercu">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Événements par catégorie</CardTitle>
                  <CardDescription>
                    Répartition des événements par catégorie
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={eventsByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {eventsByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Événements à venir</CardTitle>
                  <CardDescription>
                    Événements qui requièrent votre attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Festival de Jazz</h4>
                        <p className="text-sm text-muted-foreground">Vendredi, 20 Mai 2025</p>
                      </div>
                      <div className="bg-yellow-100 px-2 py-1 rounded text-sm text-yellow-800">
                        À vérifier
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Conférence Tech</h4>
                        <p className="text-sm text-muted-foreground">Samedi, 21 Mai 2025</p>
                      </div>
                      <div className="bg-purple-100 px-2 py-1 rounded text-sm text-purple-800">
                        Populaire
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Exposition d'Art</h4>
                        <p className="text-sm text-muted-foreground">Dimanche, 22 Mai 2025</p>
                      </div>
                      <div className="bg-blue-100 px-2 py-1 rounded text-sm text-blue-800">
                        Nouveau
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tendances">
            <div className="grid grid-cols-1 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenus mensuels</CardTitle>
                  <CardDescription>
                    Analyse des revenus sur les 6 derniers mois
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} €`, "Revenus"]} />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenus (€)" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
