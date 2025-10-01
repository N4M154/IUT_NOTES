import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export function Dashboard() {
  const { user, Logout } = useContext(AuthContext);
  const { users } = useContext(UserContext);

  useEffect(() => {
    if (user.email === "") {
      alert("Please login first");
    }
  }, [user]);

  if (user.email === "") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      <button onClick={Logout}>Logout</button>
      <h2>Users List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
