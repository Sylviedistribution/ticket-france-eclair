
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PAYMENT_METHODS } from "@/constants";
import { useToast } from "@/hooks/use-toast";

// SVG icons for payment methods
const PaymentIcons: Record<string, JSX.Element> = {
  "Paytech": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0055FF" />
      <path d="M7 12H17M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "MTN Mobile Money": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FFCC00" />
      <path d="M7 8H17V16H7V8Z" fill="#FF0000" />
      <path d="M9 11L12 14L15 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Airtel Money": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF0000" />
      <path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
};

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  totalAmount: number;
  ticketCount: number;
}

export function PaymentModal({ open, onOpenChange, eventTitle, totalAmount, ticketCount }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: "Erreur de paiement",
        description: "Veuillez sélectionner une méthode de paiement.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simuler un traitement de paiement
    setTimeout(() => {
      toast({
        title: "Paiement réussi",
        description: `Votre paiement de ${totalAmount.toLocaleString()} F a été traité avec succès.`,
      });
      setLoading(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finaliser votre achat</DialogTitle>
          <DialogDescription>
            {ticketCount} billet{ticketCount > 1 ? 's' : ''} pour {eventTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <span className="font-medium">Total à payer</span>
            <span className="text-xl font-bold">{totalAmount.toLocaleString()} F</span>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Méthode de paiement</h4>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method}
                  className={`flex items-center space-x-3 border p-3 rounded-md cursor-pointer transition-all ${
                    paymentMethod === method ? "border-eticket-500 bg-eticket-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setPaymentMethod(method)}
                >
                  <RadioGroupItem value={method} id={method} />
                  <div className="flex items-center space-x-3 flex-1">
                    {PaymentIcons[method]}
                    <Label htmlFor={method} className="cursor-pointer flex-1">
                      {method}
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 mt-2">
          <Button onClick={handlePayment} disabled={!paymentMethod || loading}>
            {loading ? "Traitement en cours..." : `Payer ${totalAmount.toLocaleString()} F`}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
