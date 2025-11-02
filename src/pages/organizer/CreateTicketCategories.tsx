import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";


const CreateTicketCategory = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { toast } = useToast();  
  
  const categoryOptions = ["Standard", "VIP", "Premium"];
  const currencyOptions = ["XOF", "XFA", "EUR", "USD", "GBP"];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    currency: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(`http://localhost:8000/api/ticketCategories/create/${id}`,
        {
          name: formData.name,
          price: formData.price,
          quantity: formData.quantity,
          currency: formData.currency,
          event_id: id, // Assure-toi que c'est bien "event_id" attendu côté backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      toast({
          description: "Catégorie créée avec succès !",
        });
      navigate(`/organizer/events/${id}/tickets`);    
    } catch (error: any) {
      console.error("Erreur lors de la création :", error);
      if (error.response) {
        setError(error.response.data.message || "Erreur serveur.");
      } else {
        setError("Impossible de contacter le serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Créer une catégorie de ticket</h1>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">Catégorie créée avec succès !</div>}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Catégorie */}
            <div className="space-y-2">
              <Label>Catégorie du ticket</Label>
              <Select
                value={formData.name}
                onValueChange={(value) => handleChange("name", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Devise */}
            <div className="space-y-2">
              <Label>Devise</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => handleChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une devise" />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Prix */}
            <div className="space-y-2">
              <Label>Prix</Label>
              <Input
                placeholder="Prix"
                type="number"
                min={0}
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>

            {/* Quantité */}
            <div className="space-y-2">
              <Label>Quantité</Label>
              <Input
                placeholder="Quantité"
                type="number"
                min={0}
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTicketCategory;
