
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserTickets from "./pages/user/UserTickets";
import UserProfile from "./pages/user/UserProfile";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import OrganizerEvents from "./pages/organizer/OrganizerEvents";
import OrganizerEventEdit from "./pages/organizer/EditEvent";
import OrganizerProfile from "./pages/organizer/OrganizerProfile";
import CreateTicketCategories from "./pages/organizer/CreateTicketCategories";
import ListTicketCategories from "./pages/organizer/ListTicketCategories";
import CreateEvent from "./pages/organizer/CreateEvent";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEvents from "./pages/admin/Events";
import AdminTransactions from "./pages/admin/Transactions";
import AdminUsers from "./pages/admin/Users";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy"; 
import Refunds from "./pages/Refunds";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCurrentUser } from "@/hooks/useCurrentUser";



const queryClient = new QueryClient();

const App = () => {
  const currentUser = useCurrentUser();
  console.log(currentUser)

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />

            {/* User Routes */}
            <Route
              path="/user/tickets"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["user"]}>
                  <UserTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["user"]}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
             <Route
              path="/user/events"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["user"]}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            {/* Organizer Routes */}
            <Route
              path="/organizer/dashboard"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["organizer"]}>
                  <OrganizerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/events"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["organizer"]}>
                  <OrganizerEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/events/create"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["organizer"]}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/profile"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["organizer"]}>
                  <OrganizerProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/events/:id/tickets/create/"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["organizer"]}>
                  <CreateTicketCategories />
                </ProtectedRoute>
              }
            />
          
            <Route
              path="/organizer/events/:id/tickets"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["organizer"]}>
                  <ListTicketCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizer/events/:id/edit"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["organizer"]}>
                  <OrganizerEventEdit />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["admin"]}>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transactions"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["admin"]}>
                  <AdminTransactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute user={currentUser} allowedRoles={["admin"]}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
