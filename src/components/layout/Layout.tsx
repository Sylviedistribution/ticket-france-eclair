import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { User } from "@/types";  // Assure-toi que User a le rôle comme propriété

// Récupérer le token et les données utilisateur depuis localStorage
const getUserFromLocalStorage = (): User | null => {
  const userString = localStorage.getItem("user");
  if (userString) {
    return JSON.parse(userString); // On suppose que l'objet utilisateur est stocké en JSON
  }
  return null;
};

interface LayoutProps {
  children: ReactNode;
  currentUser?: User; // ou non optional si toujours fourni
  onLogout?: () => void;
}
export function Layout({ children, onLogout }: LayoutProps) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // Hook pour redirection

  // Récupérer les informations utilisateur dès que le composant est monté
  useEffect(() => {
    const user = getUserFromLocalStorage();
    
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Lorsque l'utilisateur se déconnecte
  const handleLogout = () => {
     // Supprimer le token s'il est stocké
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setCurrentUser(null);

    if (onLogout) onLogout();

    // Redirection vers la page d'accueil
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
