
import React, { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { User } from "@/types";

interface LayoutProps {
  children: ReactNode;
  currentUser?: User | null;
  onLogout?: () => void;
}

export function Layout({ children, currentUser, onLogout }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        currentUser={currentUser} 
        onLogout={onLogout}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
