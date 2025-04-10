import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RecipeGenerator from "./components/RecipeGenerator";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RecipePage from "./pages/RecipePage";
import FavoriteRecipes from "./pages/FavoriteRecipes"; 
import "./App.css";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <Router>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
      </Routes>
    </Router>
  );
};



export default App;

