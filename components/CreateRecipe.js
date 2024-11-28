import React, { useState } from 'react';
import HomeButton from './HomeButton';

function CreateRecipe({ recipes, setRecipes }) {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleCreateRecipe = (e) => {
    e.preventDefault();

    if (!recipeName || !ingredients) {
      alert('Please fill in all fields.');
      return;
    }

    // Add the new recipe to the recipes list
    const newRecipe = {
      id: recipes.length + 1, // Generate a unique ID
      name: recipeName,
      description: ingredients,
    };

    setRecipes([...recipes, newRecipe]); // Update the recipes list
    alert(`Recipe "${recipeName}" created successfully!`);

    // Clear the form fields
    setRecipeName('');
    setIngredients('');
  };

  return (
    <div className="create-recipe-page">
      <HomeButton />
      <h1>Create a New Recipe</h1>
      <form onSubmit={handleCreateRecipe}>
        <div>
          <input
            type="text"
            placeholder="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="search-bar"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="search-bar"
          />
        </div>
        <button type="submit" className="submit-button">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;