import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import RecipeGenerator from "./components/RecipeGenerator";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RecipePage from "./pages/RecipePage"; // Import Recipe Page
import "./App.css";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={() => { localStorage.removeItem("user"); setUser(null); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>
    </Router>
  );
};

export default App;
