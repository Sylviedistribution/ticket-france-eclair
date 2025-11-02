import { Navigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser"; // adapte le chemin si besoin

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  console.log("Utilisateur courant :", currentUser);

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;