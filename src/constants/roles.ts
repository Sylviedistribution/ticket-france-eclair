
// User roles definition
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
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  // Links for authenticated users with USER role
  USER: [
    { label: "Accueil", href: "/" },
    { label: "Événements", href: "/events" },
    { label: "Mes tickets", href: "/user/tickets" },
    { label: "Profil", href: "/user/profile" },
    { label: "Contact", href: "/contact" },

  ],
  // Links for authenticated users with ORGANIZER role
  ORGANIZER: [
    { label: "Tableau de bord", href: "/organizer/dashboard" },
    { label: "Événements", href: "/organizer/events" },
    { label: "Profil", href: "/organizer/profile" },
    { label: "Contact", href: "/contact" },

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

