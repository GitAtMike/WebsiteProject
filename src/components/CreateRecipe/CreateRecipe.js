import React, { useState } from "react";
import HomeButton from "../HomeButton";
import "./styles.css";

function CreateRecipe({ recipes, setRecipes }) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([""]);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();

    if (!recipeName || ingredients.some((ing) => !ing.trim())) {
      alert("Please fill in all fields.");
      return;
    }

    const newRecipe = {
      title: recipeName,
      ingredients: ingredients.filter((ing) => ing.trim()),
    };

    try {
      const response = await fetch("http://localhost:8888/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create recipe");
      }

      const savedRecipe = await response.json();


      setRecipes([...recipes, savedRecipe]);
      alert(`Recipe "${recipeName}" created successfully!`);

      setRecipeName("");
      setIngredients([""]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
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
          <h3>Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="search-bar"
                style={{ flexGrow: 1 }}
              />
              <button
                className="btn-remove"
                type="button"
                onClick={() => removeIngredientField(index)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="btn-add"
            type="button"
            onClick={addIngredientField}
          >
            Add Ingredient
          </button>
        </div>
        <button type="submit" className="submit-button">
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
