import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import HomePage from "./pages/HomePage";
import "../src/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <h1>Lab 4 - 210042112</h1>

        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <HomeRedirect onLogout={handleLogout} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/signin"
            element={
              <SignInForm
                setIsAuthenticated={setIsAuthenticated}
                setCurrentUser={(user) => {
                  setCurrentUser(user);
                  localStorage.setItem("currentUser", JSON.stringify(user));
                }}
              />
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <HomePage currentUser={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function HomeRedirect({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button onClick={() => navigate("/signin")}>Sign In</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <p>Please sign in or sign up to continue</p>
    </div>
  );
}

export default App;

// -_- N4M154 -_-
