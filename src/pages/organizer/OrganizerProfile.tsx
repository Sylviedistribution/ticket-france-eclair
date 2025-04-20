
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MOCK_USERS } from "@/constants";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, User as UserIcon, Building, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const OrganizerProfile = () => {
  const { toast } = useToast();
  
  // Dans une implémentation réelle, ces données viendraient de l'API
  const currentUser = MOCK_USERS[1] as unknown as User;
  const [isEditing, setIsEditing] = useState(false);
  
  // État pour les données du formulaire personnel
  const [personalData, setPersonalData] = useState({
    fullName: currentUser.fullName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber || "",
    avatar: currentUser.avatar
  });

  // État pour les données de l'organisation
  const [organizationData, setOrganizationData] = useState({
    organizationName: "Productions Culturelles du Congo",
    description: "Nous organisons les meilleurs événements culturels au Congo.",
    website: "https://www.pcc-events.cg",
    address: "Avenue de la Libération, Brazzaville"
  });

  // Gérer les changements dans le formulaire personnel
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  // Gérer les changements dans le formulaire de l'organisation
  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrganizationData(prev => ({ ...prev, [name]: value }));
  };

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dans une implémentation réelle, nous enverrions ces données à l'API
    console.log("Données personnelles:", personalData);
    console.log("Données de l'organisation:", organizationData);
    
    // Simuler une mise à jour réussie
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès."
    });
    
    setIsEditing(false);
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
    <Layout currentUser={currentUser}>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-eticket-500">Profil Organisateur</h1>
            <p className="text-gray-600">Gérez vos informations personnelles et celles de votre organisation</p>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="organization">Organisation</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
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
                          <AvatarImage src={personalData.avatar} alt={personalData.fullName} />
                          <AvatarFallback className="text-2xl">{getInitials(personalData.fullName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-semibold">{personalData.fullName}</h2>
                          <p className="text-gray-500">Organisateur</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Email</p>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <p>{personalData.email}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Téléphone</p>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <p>{personalData.phoneNumber || "Non renseigné"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={personalData.avatar} alt={personalData.fullName} />
                          <AvatarFallback className="text-2xl">{getInitials(personalData.fullName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Label htmlFor="avatar">URL de l'avatar</Label>
                          <Input
                            id="avatar"
                            name="avatar"
                            value={personalData.avatar}
                            onChange={handlePersonalChange}
                            className="mt-1"
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
                              value={personalData.fullName}
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
                              value={personalData.email}
                              onChange={handlePersonalChange}
                              className="pl-8"
                            />
                            <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber">Téléphone</Label>
                          <div className="relative">
                            <Input
                              id="phoneNumber"
                              name="phoneNumber"
                              value={personalData.phoneNumber}
                              onChange={handlePersonalChange}
                              placeholder="+242 XX XXX XXXX"
                              className="pl-8"
                            />
                            <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          </div>
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
            </TabsContent>

            <TabsContent value="organization">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Informations de l'organisation</CardTitle>
                      <CardDescription>Ces informations seront affichées sur vos événements</CardDescription>
                    </div>
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
                      <div>
                        <h2 className="text-2xl font-semibold">{organizationData.organizationName}</h2>
                        <p className="text-gray-700 mt-2">{organizationData.description}</p>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Site web</p>
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4 text-gray-500" />
                            <a 
                              href={organizationData.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-eticket-500 hover:underline"
                            >
                              {organizationData.website}
                            </a>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Adresse</p>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            <p>{organizationData.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="organizationName">Nom de l'organisation</Label>
                        <div className="relative">
                          <Input
                            id="organizationName"
                            name="organizationName"
                            value={organizationData.organizationName}
                            onChange={handleOrgChange}
                            className="pl-8"
                          />
                          <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={organizationData.description}
                          onChange={handleOrgChange}
                          rows={4}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="website">Site web</Label>
                          <div className="relative">
                            <Input
                              id="website"
                              name="website"
                              type="url"
                              value={organizationData.website}
                              onChange={handleOrgChange}
                              className="pl-8"
                            />
                            <ExternalLink className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input
                            id="address"
                            name="address"
                            value={organizationData.address}
                            onChange={handleOrgChange}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default OrganizerProfile;
