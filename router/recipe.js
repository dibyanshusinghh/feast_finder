const express = require('express');
const recipeRouter = express.Router();
const authMiddleware = require('../middleware/authenticate');
const Recipe = require('../controller/recipeController');

// Fetches all the recipes available
recipeRouter.get('/', authMiddleware.authenticate, Recipe.getAllRecipe);

// Fetch recipe by id
recipeRouter.get('/:id', authMiddleware.authenticate, Recipe.getRecipeById);

// Fetches all the recipes by user_id
recipeRouter.get('/user/:user_id', authMiddleware.authenticate, Recipe.getRecipeByUserId); 

// Creates a recipe entry in recipe table
recipeRouter.post('/', authMiddleware.authenticate, Recipe.createRecipe);

// Updates a recipe by id
recipeRouter.patch('/:id', authMiddleware.authenticate, Recipe.updateRecipe);

// Deletes a recipe by id
recipeRouter.delete('/:id', authMiddleware.authenticate, Recipe.deleteRecipe);


module.exports = recipeRouter;