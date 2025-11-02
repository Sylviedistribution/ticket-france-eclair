import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import useCurrentUser from "../../hooks/useCurrentUser";
import { EVENT_CATEGORIES } from "@/constants";
import { Event } from "@/types";
import axios from "axios";

const EditEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useCurrentUser();
  const { id } = useParams();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    startDate: "",
    startTime: "",
    endTime: "",
    imageUrl: "",
    organizerId: "",
    organizerName: "",
    imageFile: null as File | null,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${id}`);
        const eventData = response.data.data;
        setEvent(eventData);

        setFormData({
          title: eventData.title || "",
          description: eventData.description || "",
          category: eventData.category || "",
          location: eventData.location || "",
          startDate: eventData.event_date || "",
          startTime: eventData.start_time || "",
          endTime: eventData.end_time || "",
          imageUrl: eventData.banner_url || "",
          organizerId: currentUser?.id || "",
          organizerName: currentUser?.name || "",
          imageFile: null,
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: error.response?.data.message || "Impossible de récupérer les infos de l'événement.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("event_date", formData.startDate);
      data.append("start_time", formData.startTime);
      data.append("end_time", formData.endTime);
      data.append("organizer_id", formData.organizerId);
      data.append("organizer_name", formData.organizerName);

      if (formData.imageFile) {
        data.append("banner", formData.imageFile);
      }

      await axios.post(`http://localhost:8000/api/events/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: "Succès",
        description: "Événement modifié avec succès.",
      });
      navigate('/organizer/events');
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.response?.data.message || "Impossible de modifier l'événement.",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="container px-4 py-8 mx-auto text-center">
          <p>Chargement...</p>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container px-4 py-8 mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
          <p>L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentUser={currentUser}>
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-eticket-500">Modifier l'événement</h1>
            <p className="text-gray-600">Modifiez les informations ci-dessous pour mettre à jour votre événement</p>
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
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Bannière</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {previewUrl && <img src={previewUrl} alt="Aperçu bannière" className="mt-2 rounded-md max-h-60" />}
                      {!previewUrl && formData.imageUrl && <img src={formData.imageUrl} alt="Bannière actuelle" className="mt-2 rounded-md max-h-60" />}
                    </div>
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
                    <Label htmlFor="startDate">Date de début *</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Heure de début *</Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Heure de fin</Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/organizer/events')}>
                Annuler
              </Button>
              <Button type="submit">Modifier l'événement</Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditEvent;
