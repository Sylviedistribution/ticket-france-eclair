
// Event categories
export const EVENT_CATEGORIES = [
  "Conférence",
  "Concert",
  "Festival",
  "Exposition",
  "Théâtre",
  "Sport",
  "Formation",
  "Séminaire",
  "Gastronomie",
  "Autre"
];

// Payment methods
export const PAYMENT_METHODS = [
  "Paytech",
  "MTN Mobile Money",
  "Airtel Money"
];

// Roles
export const USER_ROLES = {
  ADMIN: "admin",
  ORGANIZER: "organizer",
  USER: "user"
};

// Navigation links based on user role
export const NAV_LINKS = {
  // Links for unauthenticated users
  PUBLIC: [
    { label: "Accueil", href: "/" },
    { label: "Événements", href: "/events" },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  // Links for authenticated users with USER role
  USER: [
    { label: "Accueil", href: "/" },
    { label: "Événements", href: "/events" },
    { label: "Mes tickets", href: "/user/tickets" },
    { label: "Profil", href: "/user/profile" },
  ],
  // Links for authenticated users with ORGANIZER role
  ORGANIZER: [
    { label: "Tableau de bord", href: "/organizer/dashboard" },
    { label: "Événements", href: "/organizer/events" },
    { label: "Ventes", href: "/organizer/sales" },
    { label: "Profil", href: "/organizer/profile" },
  ],
  // Links for authenticated users with ADMIN role
  ADMIN: [
    { label: "Tableau de bord", href: "/admin/dashboard" },
    { label: "Utilisateurs", href: "/admin/users" },
    { label: "Événements", href: "/admin/events" },
    { label: "Transactions", href: "/admin/transactions" },
    { label: "Notifications", href: "/admin/notifications" },
  ],
};

// Mock events data
export const MOCK_EVENTS = [
  {
    id: "1",
    title: "Festival de musique Jazz",
    category: "Concert",
    startDate: "2024-06-15T18:00:00",
    endDate: "2024-06-15T23:00:00",
    location: "Parc de la Musique, Brazzaville",
    isOnline: false,
    description: "Profitez d'une soirée exceptionnelle de jazz avec des artistes renommés du monde entier. Une expérience musicale unique en plein cœur de la ville.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    capacity: 2000,
    ticketPrice: 25000,
    organizerId: "org1",
    organizerName: "Jazz Productions",
    createdAt: "2024-01-15T10:30:00",
    ticketCategories: [
      { id: "cat1-1", name: "Standard", price: 25000, quantity: 1500, eventId: "1" },
      { id: "cat1-2", name: "VIP", price: 50000, quantity: 500, eventId: "1" }
    ],
    ticketsSold: 750
  },
  {
    id: "2",
    title: "Conférence Tech Innovation",
    category: "Conférence",
    startDate: "2024-05-10T09:00:00",
    endDate: "2024-05-12T18:00:00",
    location: "Centre des Congrès, Kinshasa",
    isOnline: false,
    description: "Trois jours dédiés aux dernières innovations technologiques avec des ateliers pratiques et des conférences par des experts du secteur.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    capacity: 1000,
    ticketPrice: 15000,
    organizerId: "org2",
    organizerName: "TechMasters",
    createdAt: "2024-01-20T14:20:00",
    ticketCategories: [
      { id: "cat2-1", name: "Entrée standard", price: 15000, quantity: 800, eventId: "2" },
      { id: "cat2-2", name: "Pack Premium", price: 35000, quantity: 200, eventId: "2" }
    ],
    ticketsSold: 420
  },
  {
    id: "3",
    title: "Tournoi de Football Inter-Écoles",
    category: "Sport",
    startDate: "2024-05-25T10:00:00",
    endDate: "2024-05-25T17:00:00",
    location: "Stade Municipal, Pointe-Noire",
    isOnline: false,
    description: "Compétition sportive entre les meilleures équipes des écoles de la région. Venez soutenir votre équipe favorite!",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    capacity: 5000,
    ticketPrice: 2000,
    organizerId: "org3",
    organizerName: "Académie Sportive",
    createdAt: "2024-02-05T09:15:00",
    ticketCategories: [
      { id: "cat3-1", name: "Entrée générale", price: 2000, quantity: 4500, eventId: "3" },
      { id: "cat3-2", name: "Tribune d'honneur", price: 5000, quantity: 500, eventId: "3" }
    ],
    ticketsSold: 1200
  },
  {
    id: "4",
    title: "Exposition d'art contemporain",
    category: "Exposition",
    startDate: "2024-06-01T10:00:00",
    endDate: "2024-06-30T19:00:00",
    location: "Galerie Nationale, Brazzaville",
    isOnline: false,
    description: "Découvrez les œuvres de 20 artistes émergents qui repoussent les frontières de l'art contemporain africain.",
    imageUrl: "https://images.unsplash.com/photo-1531243132304-62266698bc05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    capacity: 300,
    ticketPrice: 5000,
    organizerId: "org4",
    organizerName: "Arts Vision",
    createdAt: "2024-02-15T11:30:00",
    ticketCategories: [
      { id: "cat4-1", name: "Entrée simple", price: 5000, quantity: 280, eventId: "4" },
      { id: "cat4-2", name: "Visite guidée", price: 10000, quantity: 20, eventId: "4" }
    ],
    ticketsSold: 120
  },
  {
    id: "5",
    title: "Atelier sur le Leadership",
    category: "Formation",
    startDate: "2024-05-15T09:00:00",
    endDate: "2024-05-15T17:00:00",
    location: "Hôtel Radisson Blu, Brazzaville",
    isOnline: false,
    description: "Une journée intensive pour développer vos compétences en leadership et gestion d'équipe avec des exercices pratiques.",
    imageUrl: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    capacity: 50,
    ticketPrice: 50000,
    organizerId: "org5",
    organizerName: "Business School",
    createdAt: "2024-02-25T16:45:00",
    ticketCategories: [
      { id: "cat5-1", name: "Participation standard", price: 50000, quantity: 45, eventId: "5" },
      { id: "cat5-2", name: "Pack entreprise", price: 200000, quantity: 5, eventId: "5" }
    ],
    ticketsSold: 32
  },
  {
    id: "6",
    title: "Concert Rumba Congolaise",
    category: "Concert",
    startDate: "2024-07-20T20:00:00",
    endDate: "2024-07-21T02:00:00",
    location: "Arena Hall, Kinshasa",
    isOnline: false,
    description: "Une nuit entière de Rumba Congolaise avec les meilleurs artistes du pays pour célébrer la richesse culturelle de notre musique.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    capacity: 3000,
    ticketPrice: 20000,
    organizerId: "org6",
    organizerName: "Congo Music Productions",
    createdAt: "2024-03-01T10:00:00",
    ticketCategories: [
      { id: "cat6-1", name: "Entrée standard", price: 20000, quantity: 2500, eventId: "6" },
      { id: "cat6-2", name: "VIP", price: 50000, quantity: 500, eventId: "6" }
    ],
    ticketsSold: 850
  }
];

// Mock users data
export const MOCK_USERS = [
  {
    id: "user1",
    email: "utilisateur@example.com",
    password: "password123",
    fullName: "Jean Dupont",
    role: "user",
    avatar: "https://ui-avatars.com/api/?name=Jean+Dupont",
    phoneNumber: "+242 06 123 4567"
  },
  {
    id: "org1",
    email: "organisateur@example.com",
    password: "password123",
    fullName: "Marie Organisatrice",
    role: "organizer",
    avatar: "https://ui-avatars.com/api/?name=Marie+Organisatrice",
    phoneNumber: "+242 05 987 6543"
  },
  {
    id: "admin1",
    email: "admin@example.com",
    password: "password123",
    fullName: "Admin Système",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin+Systeme",
    phoneNumber: "+242 05 555 5555"
  }
];

// Mock tickets data
export const MOCK_TICKETS = [
  {
    id: "ticket1",
    eventId: "1",
    eventTitle: "Festival de musique Jazz",
    categoryId: "cat1-1",
    categoryName: "Standard",
    userId: "user1",
    userName: "Jean Dupont",
    purchaseDate: "2024-04-01T14:30:00",
    price: 25000,
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    status: "active",
    transactionId: "trans1"
  },
  {
    id: "ticket2",
    eventId: "2",
    eventTitle: "Conférence Tech Innovation",
    categoryId: "cat2-1",
    categoryName: "Entrée standard",
    userId: "user1",
    userName: "Jean Dupont",
    purchaseDate: "2024-03-25T10:15:00",
    price: 15000,
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    status: "active",
    transactionId: "trans2"
  }
];
