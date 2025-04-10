import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipePage.css";

const RecipePage = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const storedRecipe = localStorage.getItem("recipe");

    if (storedRecipe && storedRecipe.trim()) {
      setRecipe(storedRecipe);

      const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
      const normalizedRecipe = storedRecipe.trim().toLowerCase();

      const isAlreadyFav = favourites.some(
        (fav) =>
          fav?.content &&
          fav.content.trim().toLowerCase() === normalizedRecipe
      );

      setIsFavourite(isAlreadyFav);
    } else {
      setRecipe("No recipe available. Please generate one first.");
    }
  }, []);

  const addToFavourites = () => {
    if (!recipe.trim()) {
      alert("Cannot save an empty recipe.");
      return;
    }

    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const normalizedRecipe = recipe.trim().toLowerCase();

    const isAlreadyFav = favourites.some(
      (fav) =>
        fav?.content &&
        fav.content.trim().toLowerCase() === normalizedRecipe
    );

    if (isAlreadyFav) {
      alert("This recipe is already in your favourites.");
      return;
    }

    const name = prompt("Enter a name for this recipe:")?.trim();
    if (!name) {
      alert("Recipe name is required.");
      return;
    }

    favourites.push({ name, content: recipe });
    localStorage.setItem("favourites", JSON.stringify(favourites));
    setIsFavourite(true);
    alert("Recipe added to your favourites!");
  };

  const shareRecipe = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this Recipe!",
          text: recipe,
        })
        .catch((error) => console.log("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(recipe);
      alert("Recipe copied to clipboard!");
    }
  };

  return (
    <div className="recipe-page">
      <h1>Your Generated Recipe</h1>
      <pre className="recipe-content">{recipe}</pre>

      <div className="button-container">
        <button className="btn" onClick={() => navigate("/")}>
          🏠 Back to Home
        </button>
        <button className="btn" onClick={shareRecipe}>
          📤 Share Recipe
        </button>
        <button
          className="btn fav-btn"
          onClick={addToFavourites}
          disabled={isFavourite}
        >
          {isFavourite ? "❤️ Added to Favourites" : "🤍 Add to Favourites"}
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
