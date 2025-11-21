import { useState, useEffect } from "react";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import Register from "./pages/auth/Register";
import './App.css';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setUserName(userData.name);
    localStorage.setItem("userName", userData.name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("userName");
  };

  return (
    <div className="app-container">
      <Home
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
        onLogout={handleLogout}
      />
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
        />
      )}     
    </div>
  );
}
