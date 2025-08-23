import { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from "../api/axios";


const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me"); // backend route to return user info
      setUser(data.user);
    } catch(err) {
      // toast.error(err?.message)
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


    const login = async (credentials) => {
    await api.post("/auth/login", credentials);
    await fetchUser(); // refresh user after login
  };

  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };


  const value = {user, login, logout, loading};

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    //<AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);