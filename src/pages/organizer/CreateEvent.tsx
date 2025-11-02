
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MOCK_USERS, EVENT_CATEGORIES } from "@/constants";
import { User } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Dans une implémentation réelle, ces données viendraient de l'API
  const currentUser = MOCK_USERS[1] as unknown as User;

  // État pour le formulaire
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    isOnline: false,
    startDate: "",
    endDate: "",
    ticketPrice: "",
    capacity: "",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  });

  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isOnline: checked }));
  };

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation de base
    if (!formData.title || !formData.description || !formData.category || !formData.startDate) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    // Dans une implémentation réelle, nous enverrions ces données à l'API
    console.log("Données de l'événement à créer:", formData);
    
    // Simuler une création réussie
    toast({
      title: "Événement créé",
      description: "Votre événement a été créé avec succès.",
    });
    
    // Rediriger vers la liste des événements
    navigate('/organizer/events');
  };

  return (
    <Layout currentUser={currentUser}>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-eticket-500">Créer un événement</h1>
            <p className="text-gray-600">Remplissez le formulaire ci-dessous pour créer un nouvel événement</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de l'événement *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Ex: Concert de musique"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Décrivez votre événement en détail..."
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {EVENT_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Lieu</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Ex: Palais des Congrès"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={formData.isOnline}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Bannière</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isOnline"
                      checked={formData.isOnline}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="isOnline">Événement en ligne</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date et Heure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date et heure de début *</Label>
                    <div className="relative">
                      <Input
                        id="startDate"
                        name="startDate"
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date et heure de fin</Label>
                    <div className="relative">
                      <Input
                        id="endDate"
                        name="endDate"
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticketPrice">Prix du billet (F CFA) *</Label>
                    <Input
                      id="ticketPrice"
                      name="ticketPrice"
                      type="number"
                      placeholder="Ex: 10000"
                      value={formData.ticketPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacité maximale *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      placeholder="Ex: 100"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/organizer/events')}
              >
                Annuler
              </Button>
              <Button type="submit">Créer l'événement</Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;
