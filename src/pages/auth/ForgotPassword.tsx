
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Veuillez entrer votre adresse email");
      return;
    }

    try {
      setLoading(true);
      // Dans une implémentation réelle, appel à l'API Supabase pour réinitialiser le mot de passe
      console.log("Réinitialisation du mot de passe pour:", email);
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Erreur de réinitialisation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-eticket-500">Mot de passe oublié</h1>
            <p className="mt-2 text-gray-600">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {success ? (
            <div className="mt-8 text-center">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
                Un email avec les instructions pour réinitialiser votre mot de passe a été envoyé à {email}.
              </div>
              <Link to="/auth/login" className="text-eticket-400 hover:text-eticket-500 inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse email
                  </label>
                  <div className="mt-1 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </span>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
                </Button>
              </div>

              <div className="text-center text-sm">
                <Link to="/auth/login" className="font-medium text-eticket-400 hover:text-eticket-500 inline-flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Retour à la connexion
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
