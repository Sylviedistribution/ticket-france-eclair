import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarDays, Users, Ticket, TrendingUp, ArrowUpCircle, Calendar, Clock, MapPin
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "@/components/layout/Layout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";


interface DashboardData {
  total_events: number;
  total_tickets_sold: number;
  total_revenue: number;
  performance: { event: string; tickets_sold: number; revenue: number }[];
  category_distribution: { [category: string]: number };
  upcoming_event: any;
  top_events: any[];
  monthly_revenue: { month: number; revenue: number }[];
  average_fill_rate: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];

const OrganizerDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8000/api/dashboard", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log((response.data))
      setData(response.data);
    })
    .catch((error) => {
      console.error("Erreur dashboard :", error);
    })
    .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const categoryData = () => {
    if (!data?.category_distribution) return [];
    return Object.entries(data.category_distribution).map(([name, value]) => ({ name, value }));
  };

  if (loading) return <p className="text-center py-10">Chargement...</p>;

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-eticket-500">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue. Voici un aperçu de vos événements et performances.</p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Événements</p>
                <p className="text-3xl font-bold">{data?.total_events ?? 0}</p>
              </div>
              <div className="bg-eticket-100 p-3 rounded-full">
                <CalendarDays className="h-6 w-6 text-eticket-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Billets Vendus</p>
                <p className="text-3xl font-bold">{data?.total_tickets_sold ?? 0} </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Ticket className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenu Total</p>
                <p className="text-3xl font-bold">{data?.total_revenue.toLocaleString() ?? 0} F</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance des événements</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.performance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="event" angle={-45} textAnchor="end" height={70} />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="tickets_sold" name="Billets vendus" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="revenue" name="Revenu (F)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribution par catégorie</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData()}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                    {categoryData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Prochain événement */}
        <div className="mb-8">
          <Tabs defaultValue="upcoming">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-eticket-500">Mes événements</h2>
              <TabsList>
                <TabsTrigger value="upcoming">À venir</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="upcoming">
              {data.upcoming_event ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/4">
                        <img
                          src={data.upcoming_event.image}
                          alt={data.upcoming_event.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/4">
                        <h3 className="text-lg font-bold mb-2">{data.upcoming_event.title}</h3>
                        <div className="space-y-1 text-sm text-gray-500">
                          <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{formatDate(data.upcoming_event.start_date)}</div>
                          <div className="flex items-center"><Clock className="h-4 w-4 mr-2" />{new Date(data.upcoming_event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" />{data.upcoming_event.location}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Aucun événement à venir.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizerDashboard;
