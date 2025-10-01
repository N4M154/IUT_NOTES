import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
