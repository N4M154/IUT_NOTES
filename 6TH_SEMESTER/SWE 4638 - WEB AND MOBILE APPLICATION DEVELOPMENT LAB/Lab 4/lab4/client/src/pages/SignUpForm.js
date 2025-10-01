import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
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
      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Sign up failed");

      const data = await response.json();
      console.log("Sign up successful:", data);
      alert("User created successfully! Please sign in.");
      navigate("/signin");
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

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

      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;

// -_- N4M154 -_-
