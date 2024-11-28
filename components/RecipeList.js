import React, { useState } from 'react';
import HomeButton from './HomeButton';

function RecipeList({ recipes, favorites, setFavorites, setRecipes }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavorite = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
      alert(`Added "${recipe.name}" to favorites!`);
    } else {
      alert(`"${recipe.name}" is already in favorites.`);
    }
  };

  const handleRemoveRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id)); // Remove the recipe
  };

  return (
    <div className="recipe-page">
      <HomeButton />
      <h1>Recipes</h1>
      <div className="recipe-controls">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <button onClick={() => handleFavorite(recipe)}>Add to Favorites</button>
            <button
              onClick={() => handleRemoveRecipe(recipe.id)}
              className="remove-button"
            >
              Remove Recipe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;