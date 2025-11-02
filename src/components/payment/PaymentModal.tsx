import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PAYMENT_METHODS } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const PaymentIcons: Record<string, JSX.Element> = {
  MoneyFusion: (
    <img
      src="https://www.moneyfusion.net/logo.svg"
      alt="MoneyFusion"
      className="w-6 h-6 object-contain"
    />
  ),

  // "Cinetpay": (
  //   <img
  //     src="https://docs.cinetpay.com/images/logo-new.png"
  //     alt="Cinetpay"
  //     className="w-6 h-6 object-contain"
  //   />
  // ),

  //  "Paytech": (
  //   <img
  //     src="https://paytech.sn/assets/srcs/img/cover.png"
  //     alt="Paytech"
  //     className="w-6 h-6 object-contain"
  //   />
  // ),

  /* "MTN Mobile Money": (
    <img
      src="https://cdn.worldvectorlogo.com/logos/mtn-new-logo.svg"
      alt="MTN"
      className="w-6 h-6 object-contain"
    />
  ),
  "Airtel Money": (
    <img
      src="https://cdn.worldvectorlogo.com/logos/bharti-airtel-limited.svg"
      alt="Airtel"
      className="w-6 h-6 object-contain"
    />
  ),*/
};

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  totalAmount: number;
  ticketCount: number;
  currency: string;
  ticketBought: Record<string, number>;
}

export function PaymentModal({
  open,
  onOpenChange,
  eventTitle,
  totalAmount,
  ticketCount,
  currency,
  ticketBought,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  console.log("Tickets achetés :", ticketBought);

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

    const token = localStorage.getItem("token");
    try {
      console.log(paymentMethod);
      const res = await axios.post(
        `http://localhost:8000/api/${paymentMethod
          .toLowerCase()
          .replace(/\s+/g, "-")}/init`,
        {
          ticketBought: ticketBought,
          currency: currency,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer l’URL de paiement.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue pendant le paiement.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finaliser votre achat</DialogTitle>
          <DialogDescription>
            {ticketCount} billet{ticketCount > 1 ? "s" : ""} pour {eventTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <span className="font-medium">Total à payer</span>
            <span className="text-xl font-bold">
              {totalAmount.toLocaleString()} F
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Méthode de paiement</h4>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method}
                  className={`flex items-center space-x-3 border p-3 rounded-md cursor-pointer transition-all ${
                    paymentMethod === method
                      ? "border-eticket-500 bg-eticket-50"
                      : "hover:bg-gray-50"
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
            {loading
              ? "Traitement en cours..."
              : `Payer ${totalAmount.toLocaleString()} F`}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
