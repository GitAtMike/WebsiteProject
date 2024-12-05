import React, { useEffect } from "react";
import HomeButton from "../HomeButton";
import "./styles.css";

function Favorites({ favorites, setFavorites }) {
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:8888/favorites", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [setFavorites]);

  const handleRemoveFavorite = async (id) => {
    try {
      const response = await fetch(`http://localhost:8888/favorites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      const updatedFavorites = favorites.filter((recipe) => recipe._id !== id);
      setFavorites(updatedFavorites);
      alert("Recipe removed from favorites!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Failed to remove favorite. Please try again.");
    }
  };

  return (
    <div className="favorites-page">
      <HomeButton />
      <h1>Your Favorites</h1>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>No favorite recipes yet. Add some recipes to your favorites!</p>
        ) : (
          favorites.map((recipe) => (
            <div key={recipe._id} className="favorite-card">
              <h2>{recipe.title}</h2>

              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
              <button
                onClick={() => handleRemoveFavorite(recipe._id)}
                className="remove-button"
              >
                Remove from Favorites
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
