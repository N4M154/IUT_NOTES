import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const login = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (login(!email || !password)) {
      alert("Please enter both email and password");
      return;
    }

    if (login(email && password)) {
      alert("Login successful");
      navigate("/Dashboard");
    }
  }

  return (
    <>
      <form name="login form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
}
