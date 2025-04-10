import React from "react";
import { useNavigate } from "react-router-dom";
import RecipeGenerator from "../components/RecipeGenerator";
import "./Dashboard.css";

const Dashboard = () => {
  const user = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, {user} ❤️</h2>
      <p className="dashboard-subtitle">Let's whip up something delicious today! 🍳✨</p>

      <div className="recipe-generator-section">
        <RecipeGenerator />
      </div>

      <button className="floating-fav-btn" onClick={() => navigate("/favorites")}>
        ❤️ Favorites
      </button>
    </div>
  );
};

export default Dashboard;
