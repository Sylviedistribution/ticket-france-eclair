
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Transaction } from "@/types";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock transactions data
const mockTransactions: Transaction[] = [
  {
    id: "tx-123456",
    userId: "user-1",
    eventId: "event-1",
    ticketIds: ["ticket-1", "ticket-2"],
    amount: 150,
    paymentMethod: "card",
    status: "completed",
    createdAt: "2025-04-10T15:23:15"
  },
  {
    id: "tx-123457",
    userId: "user-2",
    eventId: "event-2",
    ticketIds: ["ticket-3"],
    amount: 75,
    paymentMethod: "mobile_money",
    status: "completed",
    createdAt: "2025-04-12T09:45:30"
  },
  {
    id: "tx-123458",
    userId: "user-3",
    eventId: "event-1",
    ticketIds: ["ticket-4", "ticket-5", "ticket-6"],
    amount: 225,
    paymentMethod: "card",
    status: "completed",
    createdAt: "2025-04-14T18:12:10"
  },
  {
    id: "tx-123459",
    userId: "user-4",
    eventId: "event-3",
    ticketIds: ["ticket-7"],
    amount: 50,
    paymentMethod: "bank_transfer",
    status: "pending",
    createdAt: "2025-04-15T11:05:22"
  },
  {
    id: "tx-123460",
    userId: "user-5",
    eventId: "event-2",
    ticketIds: ["ticket-8", "ticket-9"],
    amount: 150,
    paymentMethod: "mobile_money",
    status: "failed",
    createdAt: "2025-04-16T14:37:40"
  },
  {
    id: "tx-123461",
    userId: "user-1",
    eventId: "event-4",
    ticketIds: ["ticket-10"],
    amount: 100,
    paymentMethod: "card",
    status: "refunded",
    createdAt: "2025-04-18T10:15:05"
  }
];

// Additional user data for displaying names
const userNames: Record<string, string> = {
  "user-1": "John Doe",
  "user-2": "Jane Smith",
  "user-3": "Robert Johnson",
  "user-4": "Emily Williams",
  "user-5": "Michael Brown"
};

// Additional event data for displaying titles
const eventTitles: Record<string, string> = {
  "event-1": "Festival de Musique",
  "event-2": "Conférence Tech",
  "event-3": "Match de Football",
  "event-4": "Exposition d'Art"
};

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredTransactions = transactions
    .filter(transaction => {
      // Apply search term filtering
      const matchesSearch = 
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (userNames[transaction.userId]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (eventTitles[transaction.eventId]?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Apply status filtering
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Apply date sorting
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateSort === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleRefund = () => {
    if (!selectedTransaction) return;
    
    setTransactions(transactions.map(transaction => {
      if (transaction.id === selectedTransaction.id) {
        return { ...transaction, status: "refunded" };
      }
      return transaction;
    }));
    
    toast({
      title: "Remboursement effectué",
      description: `La transaction ${selectedTransaction.id} a été remboursée avec succès.`
    });
    
    setRefundDialogOpen(false);
    setSelectedTransaction(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case "card": return "Carte bancaire";
      case "mobile_money": return "Mobile Money";
      case "bank_transfer": return "Virement bancaire";
      default: return method;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Complété</span>;
      case "pending":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">En attente</span>;
      case "failed":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Échoué</span>;
      case "refunded":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Remboursé</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Gestion des transactions</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder="Rechercher des transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="completed">Complété</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="failed">Échoué</SelectItem>
                <SelectItem value="refunded">Remboursé</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={dateSort}
              onValueChange={(value) => setDateSort(value as "asc" | "desc")}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Trier par date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Plus récent d'abord</SelectItem>
                <SelectItem value="asc">Plus ancien d'abord</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => setTransactions([...mockTransactions])}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaction</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Événement</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                    <TableCell>{userNames[transaction.userId] || transaction.userId}</TableCell>
                    <TableCell>{eventTitles[transaction.eventId] || transaction.eventId}</TableCell>
                    <TableCell>{transaction.amount} €</TableCell>
                    <TableCell>{formatPaymentMethod(transaction.paymentMethod)}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      {(transaction.status === "completed" || transaction.status === "pending") && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setRefundDialogOpen(true);
                          }}
                        >
                          Rembourser
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Aucune transaction trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Résumé des transactions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card title="Transactions totales" value={transactions.length} />
            <Card 
              title="Montant total" 
              value={`${transactions.reduce((sum, t) => sum + t.amount, 0)} €`} 
            />
            <Card 
              title="Transactions réussies" 
              value={transactions.filter(t => t.status === "completed").length} 
              percentage={Math.round((transactions.filter(t => t.status === "completed").length / transactions.length) * 100)}
            />
            <Card 
              title="Remboursements" 
              value={transactions.filter(t => t.status === "refunded").length}
              percentage={Math.round((transactions.filter(t => t.status === "refunded").length / transactions.length) * 100)}
            />
          </div>
        </div>

        {/* Refund Dialog */}
        <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer le remboursement</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir rembourser la transaction {selectedTransaction?.id} d'un montant de {selectedTransaction?.amount} € ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="secondary" 
                onClick={() => setRefundDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button 
                onClick={handleRefund}
              >
                Confirmer le remboursement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

// Card component for summary statistics
const Card = ({ 
  title, 
  value, 
  percentage 
}: { 
  title: string; 
  value: string | number; 
  percentage?: number 
}) => {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      <div className="mt-1 flex items-end">
        <div className="text-2xl font-bold">{value}</div>
        {percentage !== undefined && (
          <div className="ml-2 text-sm font-medium text-muted-foreground">
            ({percentage}%)
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTransactions;
