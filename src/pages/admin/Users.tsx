
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { User, UserRole } from "@/types";
import { Ban, Mail, RefreshCw, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    fullName: "John Doe",
    role: "user",
    phoneNumber: "+33612345678"
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    fullName: "Jane Smith",
    role: "organizer",
    phoneNumber: "+33687654321"
  },
  {
    id: "3",
    email: "admin@e-ticket.com",
    fullName: "Admin User",
    role: "admin",
    phoneNumber: "+33699887766"
  },
  {
    id: "4",
    email: "organizer@example.com",
    fullName: "Event Organizer",
    role: "organizer",
    phoneNumber: "+33678901234"
  },
  {
    id: "5",
    email: "user@example.com",
    fullName: "Regular User",
    role: "user",
    phoneNumber: "+33645678901"
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailContent, setEmailContent] = useState({ subject: "", body: "" });
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlockUser = (user: User) => {
    toast({
      title: "Utilisateur bloqué",
      description: `${user.fullName} a été bloqué avec succès.`,
      variant: "destructive"
    });
  };

  const handleSendEmail = () => {
    if (!selectedUser) return;
    
    toast({
      title: "Email envoyé",
      description: `Email envoyé à ${selectedUser.fullName} avec succès.`,
    });
    
    setEmailDialogOpen(false);
    setEmailContent({ subject: "", body: "" });
    setSelectedUser(null);
  };

  const handleOpenEmailDialog = (user: User) => {
    setSelectedUser(user);
    setEmailDialogOpen(true);
  };

  const roleDisplayName = (role: UserRole) => {
    switch (role) {
      case "admin": return "Administrateur";
      case "organizer": return "Organisateur";
      case "user": return "Utilisateur";
      default: return role;
    }
  };

  const roleBadgeClass = (role: UserRole) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "organizer": return "bg-blue-100 text-blue-800";
      case "user": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Gestion des utilisateurs</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full sm:max-w-xs">
            <Input
              placeholder="Rechercher des utilisateurs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          <Button variant="outline" onClick={() => setUsers([...mockUsers])}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id.substr(0, 6)}...</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber || "Non renseigné"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadgeClass(user.role)}`}>
                        {roleDisplayName(user.role)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleOpenEmailDialog(user)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        {user.role !== "admin" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleBlockUser(user)}
                          >
                            <Ban className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Email Dialog */}
        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Envoyer un email</DialogTitle>
              <DialogDescription>
                Envoyer un email à {selectedUser?.fullName} ({selectedUser?.email})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Sujet
                </label>
                <Input
                  id="subject"
                  placeholder="Sujet de l'email"
                  value={emailContent.subject}
                  onChange={(e) => setEmailContent({...emailContent, subject: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="body" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="body"
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Contenu de l'email"
                  value={emailContent.body}
                  onChange={(e) => setEmailContent({...emailContent, body: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="secondary" 
                onClick={() => setEmailDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button 
                onClick={handleSendEmail}
                disabled={!emailContent.subject || !emailContent.body}
              >
                <Send className="mr-2 h-4 w-4" />
                Envoyer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AdminUsers;
