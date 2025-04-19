
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

// Event interface
export interface Event {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  description: string;
  imageUrl: string;
  capacity: number;
  ticketPrice: number;
  organizerId: string;
  organizerName: string;
  createdAt: string;
  ticketCategories: TicketCategory[];
  ticketsSold: number;
}

// Ticket category interface
export interface TicketCategory {
  id: string;
  name: string;
  price: number;
  quantity: number;
  eventId: string;
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
