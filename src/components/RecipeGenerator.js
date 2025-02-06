import React, { useState } from "react";
import { motion } from "framer-motion";
import "./RecipeGenerator.css"; // Import CSS for styles

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter some ingredients.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `Create a detailed recipe using these ingredients: ${ingredients}` },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.candidates) {
        setRecipe(data.candidates[0].content.parts[0].text.trim());
      } else {
        setError("No recipe found. Try again.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to fetch recipe. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="recipe-container">
      <motion.h1
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        AI Recipe Generator
      </motion.h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="input-box"
        />
        <button onClick={generateRecipe} className="generate-btn" disabled={loading}>
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </div>

      {loading && <p className="loading-text">Fetching recipe...</p>}
      {error && <p className="error-text">{error}</p>}

      {recipe && (
        <div className="recipe-result">
          <h2>Your Recipe:</h2>
          <p>{recipe}</p>
          <button
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(recipe)}
          >
            Copy Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
