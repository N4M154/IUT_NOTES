import { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/users.json")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.error("Error fetching users:", e);
      });
  }, [users]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}
