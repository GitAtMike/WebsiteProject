const Recipe = require('../models/Recipe');

// @desc Get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Add a new recipe
const addRecipe = async (req, res) => {
    const { name, ingredients, instructions } = req.body;

    try {
        const newRecipe = new Recipe({ name, ingredients, instructions });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getRecipes, addRecipe };
