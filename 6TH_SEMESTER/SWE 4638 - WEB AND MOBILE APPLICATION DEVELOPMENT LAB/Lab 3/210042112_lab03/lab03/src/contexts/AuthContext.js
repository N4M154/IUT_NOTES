import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  function Login(user) {
    setUser(user);
  }

  function Logout() {
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, setUser, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}
