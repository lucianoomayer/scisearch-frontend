import { useState, useEffect } from "react";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import Register from "./pages/auth/Register";
import './App.css';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="app-container">
      <Home
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
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
