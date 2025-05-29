import { useNavigate } from "react-router-dom";
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/status",
          { withCredentials: true }
        );
        if (response?.data?.success) {
          setUser(response.data.data.user);
        }
      } catch (error) {
        console.error("Failed to check auth status:", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const signinAction = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        data,
        {
          withCredentials: true,
        }
      );
      const res = response?.data;
      if (res?.success) {
        setUser(res?.data?.user);
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        console.error("Unexpected error:", error);
        throw new Error("Something went wrong. Please try again.");
      }
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      await axios.get("http://localhost:3000/api/v1/auth/signout", {
        withCredentials: true,
      });
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
      throw new Error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signinAction, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
