import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipePage = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState("");

  useEffect(() => {
    const storedRecipe = localStorage.getItem("recipe");
    if (storedRecipe) {
      setRecipe(storedRecipe);
    } else {
      setRecipe("No recipe available. Please generate one first.");
    }
  }, []);

  return (
    <div className="recipe-page">
      <h1>Your Generated Recipe</h1>
      <pre className="recipe-content">{recipe}</pre> {/* Shows formatted text */}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default RecipePage;
