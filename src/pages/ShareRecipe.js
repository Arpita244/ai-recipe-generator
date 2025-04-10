import React from "react";

const ShareRecipe = () => {
  const shareRecipe = (recipe) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this recipe: ${recipe}`);
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
  };

  return (
    <div>
      <h2>📤 Share Recipes</h2>
      <button onClick={() => shareRecipe("Delicious Recipe")}>Share on WhatsApp</button>
    </div>
  );
};

export default ShareRecipe;
