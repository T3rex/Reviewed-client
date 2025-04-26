import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // <-- grab loading also

  if (loading) {
    return (
      <div className="text-center text-white p-10">
        Checking authentication...
      </div>
    ); // or a spinner
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
