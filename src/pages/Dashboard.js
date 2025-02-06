import React from "react";
import RecipeGenerator from "../components/RecipeGenerator";

const Dashboard = () => {
  const user = localStorage.getItem("user"); // Get logged-in user

  return (
    <div className="dashboard">
      <h2>Welcome, {user} ❤️</h2>
      <p>We're so happy to have you here! Let's cook something amazing today. 🍽️✨</p>
      <RecipeGenerator /> {/* Include Recipe Generator */}
    </div>
  );
};

export default Dashboard;
