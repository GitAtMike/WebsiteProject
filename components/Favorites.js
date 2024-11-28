import React from 'react';
import HomeButton from './HomeButton';

function Favorites({ favorites, setFavorites }) {
  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="favorites-page">
      <HomeButton />
      <h1>Your Favorites</h1>
      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p>No favorite recipes yet. Add some recipes to your favorites!</p>
        ) : (
          favorites.map((recipe) => (
            <div key={recipe.id} className="favorite-item">
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <button
                onClick={() => handleRemoveFavorite(recipe.id)}
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