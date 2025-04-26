import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    toast.error("You need to be logged in to access this page.");
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
