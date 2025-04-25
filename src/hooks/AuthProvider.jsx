import { useNavigate } from "react-router-dom";
import { useContext, createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      console.log(res?.data?.user);
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
    setUser(null);
    const response = await axios.get(
      "http://localhost:3000/api/v1/auth/signout",
      {
        withCredentials: true,
      }
    );
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, signinAction, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
