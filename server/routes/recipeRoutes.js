const express = require('express');
const { getRecipes, addRecipe } = require('../controllers/recipeController');

const router = express.Router();

router.get('/', getRecipes);

router.post('/', addRecipe);

module.exports = router;
