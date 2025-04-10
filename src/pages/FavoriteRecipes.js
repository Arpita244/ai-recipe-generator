import React, { useState, useEffect } from "react";
import "./FavoriteRecipes.css";

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleView = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const deleteRecipe = (indexToDelete) => {
    const updatedFavorites = favorites.filter((_, i) => i !== indexToDelete);
    setFavorites(updatedFavorites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
    if (indexToDelete === selectedIndex) setSelectedIndex(null);
  };

  return (
    <div className="favorites-container">
      <h2>❤️ Favourite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet!</p>
      ) : (
        <ol className="favorites-list">
          {favorites.map((recipe, index) => (
            <li key={index} className="favorite-item">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button className="name-btn" onClick={() => toggleView(index)}>
                  {recipe.name}
                </button>
                <button className="delete-btn" onClick={() => deleteRecipe(index)}>
                  🗑️
                </button>
              </div>
              {selectedIndex === index && (
                <pre className="recipe-content">{recipe.content}</pre>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default FavoriteRecipes;
