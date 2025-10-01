import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm({ setIsAuthenticated, setCurrentUser }) {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user");

      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();
      const foundUser = users.find((user) => user.email === formData.email);

      if (foundUser) {
        setIsAuthenticated(true);
        setCurrentUser(foundUser);
        navigate("/home");
      } else {
        alert("User not found. Please sign up.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error signing in");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignInForm;

// -_- N4M154 -_-
