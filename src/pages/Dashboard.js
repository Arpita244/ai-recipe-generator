import React from "react";
import RecipeGenerator from "../components/RecipeGenerator";

const Dashboard = () => {
  const user = localStorage.getItem("loggedInUser"); // Get the logged-in username

  return (
    <div className="dashboard">
      <h2>Welcome, {user} ❤️</h2>
      <p>We're so happy to have you here! Let's cook something amazing today. 🍽️✨</p>
      <RecipeGenerator />
    </div>
  );
};

export default Dashboard;
