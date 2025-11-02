// pages/organizer/ListTicketCategories.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "@/components/layout/Layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Plus, Ticket, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";



interface TicketCategory {
  id: number;
  name: string;
  price: number;
  quantity: number;
  currency: string;
  sold: number;
}

const ListTicketCategories = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:8000/api/ticketCategories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },

      });
      console.log("Données récupérées :", response.data);
      setCategories(response.data.data);    } catch (error) {
      console.error("Erreur de chargement des categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (ticketCategoryId: number) => {
  if (!window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/api/ticketCategories/delete/${ticketCategoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    // Supprimer l'événement du state local après suppression
    setCategories((prevEvents) => prevEvents.filter((event) => event.id !== ticketCategoryId));
  } catch (error:any) {
    console.error("Erreur lors de la suppression de la categorie :", error);
    const message = error.response?.data.message || "Erreur inconnu survenue lors de la suppresion.";
    setErrorMessage(message);
  }
};

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Catégories de tickets</h1>
        <Button className="flex items-center gap-2">
              <Link to={`create`}>Créer une catégorie de tickets</Link>
          
          <Plus size={18} /> 
        </Button>
        {errorMessage && (
          <div className="ng-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"> {
            errorMessage
          }
          </div>
        )}
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Vendus</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Devise</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.price}</TableCell>
                    <TableCell>{cat.sold}</TableCell>
                    <TableCell>{cat.quantity}</TableCell>
                    <TableCell>{cat.currency}</TableCell>
                    <TableCell> 
                      <div className="flex">
                        <Button variant="outline" size="icon" onClick={() => deleteCategory(cat.id)}>
                          <Trash2 className="h-4 w-4 text-red-500"/>
                        </Button>
                      </div></TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      Aucune catégorie disponible.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ListTicketCategories;
