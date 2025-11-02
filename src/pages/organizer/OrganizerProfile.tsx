//import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, User as UserIcon, Building, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const OrganizerProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();  

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    avatar_url: "",
    piece_identite: "",
    avatarFile: null,
    identityFile: null    

  });
  const fetchProfil = async () => {
    try {
     
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8000/api/user/profile", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.profile;
      console.log("Profil reçu :", response.data);


      setUser(data);
      setFormData({
        fullName: data.name || "",
        email: data.email || "",
        phone: data.phone ?? "",
        role: data.role || "",
        avatar_url: data.avatar_url || "",
        piece_identite: data.piece_identite || "",
        avatarFile: null,
        identityFile: null
      });

    } catch (error) {
      console.error("Erreur lors du chargement du profil :", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfil();
  }, []);


  // Gérer les changements dans le formulaire personnel
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (name === "avatarFile") {
        setFormData(prev => ({
          ...prev,
          avatar_url: URL.createObjectURL(file),
          avatarFile: file,
        }));
      } else if (name === "piece_identite") {
        setFormData(prev => ({ 
          ...prev,
          piece_identite: URL.createObjectURL(file),
          identityFile: file,
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  
  };

  
  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const form = new FormData();

      form.append("name", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      if (formData.avatarFile instanceof File) {
        form.append("photo", formData.avatarFile);
      }
      
      if (formData.identityFile instanceof File) {
        form.append("piece_identite", formData.identityFile);
      }
      
      if (!formData.avatarFile || !formData.identityFile) {
        toast({
          title: "Fichiers manquants",
          description: "Veuillez sélectionner une photo de profil et une pièce d'identité.",
          variant: "destructive",
        });
        return;
      }

      // Debug Pour voir si les donnees sont bien recuperee
      for (const [key, value] of form.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, value.name, value.type, value.size);
        } else {
          console.log(`${key}:`, value);
        }
      }

      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:8000/api/user/update/`,
        
        form,
        {
          headers:{
            Authorization: `Bearer ${token}`,  
            'Content-Type': 'multipart/form-data', // nécessaire pour l'upload de fichiers
          },
        }
      );
      
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });

      await fetchProfil();
      setIsEditing(false);
    
    } catch (err: any) {
      console.error("Erreur de soumission :", err.response?.data || err.message);
      toast({
        title: "Erreur",
        description: err.response?.data.message || "Impossible de mettre à jour le profil.",
        variant: "destructive",
      });
    }
  };

  // Obtenir les initiales pour l'avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Layout currentUser={user}>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-eticket-500">Profil Organisateur</h1>
            <p className="text-gray-600">Gérez vos informations personnelles et celles de votre organisation</p>
          </div>

          
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Informations personnelles</CardTitle>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Modifier
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {!isEditing ? (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={"http://localhost:8000"+formData.avatar_url} alt={formData.fullName} />
                          <AvatarFallback className="text-2xl">{getInitials(formData.fullName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-semibold">{formData.fullName}</h2>
                          <p className="text-gray-500">Organisateur</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Email</p>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <p>{formData.email}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <p>{formData.phone || "Non renseigné"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={formData.avatar_url} alt={formData.fullName} />
                          <AvatarFallback className="text-2xl">{getInitials(formData.fullName)}</AvatarFallback>
                        </Avatar>
                        <div>
                        <Label htmlFor="avatar">Photo de profil</Label>
                          <Input
                            id="avatar"
                            name="avatarFile"
                            type="file"
                            accept="image/*"
                            onChange={handlePersonalChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Nom complet</Label>
                          <div className="relative">
                            <Input
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handlePersonalChange}
                              className="pl-8"
                            />
                            <UserIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handlePersonalChange}
                              className="pl-8"
                            />
                            <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handlePersonalChange}
                              placeholder="+242 XX XXX XXXX"
                              className="pl-8"
                            />
                            <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="piece_identite">Pièce d'identité (PDF ou image)</Label>
                          <Input
                            id="piece_identite"
                            name="piece_identite"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={ handlePersonalChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Annuler
                        </Button>
                        <Button type="submit">Enregistrer</Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>

            </div>
      </div>
    </Layout>
  );
};

export default OrganizerProfile;
