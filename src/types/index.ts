
// User roles
export type UserRole = "admin" | "organizer" | "user";

// User interface
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
}

// TicketCategory interface
export interface TicketCategory {
  id: number;
  name: 'Standard' | 'VIP' | 'Premium'; // Enum cohérent avec ta base
  price: number;
  quantity: number;
  currency: string;
}

// Event interface
export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  event_date: string;
  start_time: string;
  end_time: string;
  category: string;
  banner_url: string;
  isOnline?: boolean; 
  is_active: boolean;
  organizerId?: number; // À corriger selon la structure si nécessaire
  organizer_name: string;
  created_at: string;
  ticket_categories: TicketCategory[];
}

// Ticket interface
export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  categoryId: string;
  categoryName: string;
  userId: string;
  userName: string;
  purchaseDate: string;
  price: number;
  qrCode: string;
  status: "active" | "used" | "cancelled" | "refunded";
  transactionId: string;
}

// Transaction interface
export interface Transaction {
  id: string;
  userId: string;
  eventId: string;
  ticketIds: string[];
  amount: number;
  paymentMethod: string;
  status: "pending" | "completed" | "failed" | "refunded";
  createdAt: string;
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "email" | "sms" | "in-app";
  read: boolean;
  createdAt: string;
}

// Dashboard stats interface
export interface DashboardStats {
  totalEvents: number;
  totalTicketsSold: number;
  totalRevenue: number;
  upcomingEvents: number;
}
