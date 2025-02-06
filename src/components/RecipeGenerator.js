import React, { useState } from "react";
import { motion } from "framer-motion";
import "./RecipeGenerator.css";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `Create a detailed recipe using these ingredients: ${ingredients}` }],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
  
      // Debugging: Check the response structure
      console.log("API Response:", data);
  
      if (data.candidates && data.candidates.length > 0) {
        setRecipe(data.candidates[0].content.parts[0].text.trim());
      } else {
        setRecipe("Sorry, no recipe could be generated. Try different ingredients.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe("Failed to fetch recipe. Please try again.");
    }
    
    setLoading(false);
  };
  
  return (
    <div className="container">
      <motion.h1 className="title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        AI Recipe Generator
      </motion.h1>
      <div className="card">
        <div className="content">
          <input
            type="text"
            placeholder="Enter ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="input"
          />
          <button onClick={generateRecipe} className="button" disabled={loading}>
            {loading ? "Generating..." : "Generate Recipe"}
          </button>
          {recipe && <p className="recipe">{recipe}</p>}
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;
