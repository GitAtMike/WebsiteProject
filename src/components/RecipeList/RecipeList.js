import React, { useState, useEffect } from "react";
import HomeButton from "../HomeButton";
import "./styles.css";

function RecipeList({ favorites, setFavorites }) {
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from the database
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8888/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleFavorite = async (recipe) => {
    if (favorites.some((fav) => fav._id === recipe._id)) {
      alert(`"${recipe.title}" is already in favorites.`);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8888/favorites/${recipe._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add to favorites");
      }

      const updatedFavorites = await response.json(); // Get updated favorites from backend
      setFavorites(updatedFavorites); // Update state with backend response
      alert(`Added "${recipe.title}" to favorites!`);
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("Failed to add to favorites. Please try again.");
    }
  };

  return (
    <div className="recipe-page">
      <HomeButton />
      <h1>Recipes</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h2>{recipe.title || "Unnamed Recipe"}</h2>
            <ul>
              {recipe.ingredients &&
                recipe.ingredients.map((ing, index) => (
                  <li key={index}>{ing}</li>
                ))}
            </ul>
            <button onClick={() => handleFavorite(recipe)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
