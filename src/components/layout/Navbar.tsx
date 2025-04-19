
import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NAV_LINKS } from "@/constants";
import { UserRole } from "@/types";

interface NavbarProps {
  currentUser?: {
    fullName: string;
    role: UserRole;
    avatar?: string;
  } | null;
  onLogout?: () => void;
}

export function Navbar({ currentUser, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  // Determine which navigation links to show based on user role
  const links = currentUser 
    ? NAV_LINKS[currentUser.role.toUpperCase() as keyof typeof NAV_LINKS] 
    : NAV_LINKS.PUBLIC;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/70 border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="text-xl font-bold text-eticket-500">E-ticket</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {links.map(link => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="text-sm font-medium transition-colors hover:text-eticket-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-eticket-accent"></span>
              </Button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />
                  <AvatarFallback>{getInitials(currentUser.fullName)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{currentUser.fullName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                </div>
                {onLogout && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onLogout}
                    aria-label="Se déconnecter"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth/login">
                <Button variant="outline" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Connexion</span>
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Inscription</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-white md:hidden">
          <nav className="container mt-6 px-4 flex flex-col space-y-4">
            {links.map(link => (
              <Link 
                key={link.href} 
                to={link.href} 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            {!currentUser ? (
              <div className="flex flex-col space-y-2 mt-4">
                <Link to="/auth/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/auth/register" onClick={closeMenu}>
                  <Button className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Inscription
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />
                    <AvatarFallback>{getInitials(currentUser.fullName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentUser.fullName}</p>
                    <p className="text-sm text-muted-foreground capitalize">{currentUser.role}</p>
                  </div>
                </div>
                {onLogout && (
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={() => {
                      onLogout();
                      closeMenu();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Se déconnecter
                  </Button>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
