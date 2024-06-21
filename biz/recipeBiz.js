const Recipe = require("../repository/recipe");


// get all recipes
exports.getAllRecipe = async () => {
    try{
        const recipes = await Recipe.getAll();
        return recipes;
    }catch(err){
        throw err;
    }
}

// get recipe by id
exports.getRecipeById = async (id) => {
    try{
        const recipe = await Recipe.getById(id);
        return recipe;
    }catch(err){
        throw err;
    }
}

// get recipe by user_id
exports.getRecipeByUserId = async (user_id) => {
    try{
        const recipe = await Recipe.getByUserId(user_id);
        return recipe;
    }catch(err){
        throw err;
    }
}

// create a recipe
exports.createRecipe = async (recipe) => {
    try{
        if(recipe.hasOwnProperty("rating")){
            delete recipe.rating;     // User can not provide it's own recipe rating
        }      
        const id = await Recipe.create(recipe);
        return id;
    }catch(err){
        throw err;
    }
}

// update a recipe
exports.updateRecipe = async (recipe) => {
    try{
        if(recipe.hasOwnProperty("rating")){
            delete recipe.rating;         // User can not update it's own recipe rating
        }
        const recipeExits = await Recipe.getByUserId(recipe.user_id);
        if(!recipeExits.length){
            throw new Error("Recipe doesn't exists");
        }
        const id = await Recipe.update(recipe);
        return id;
    }catch(err){
        throw err;
    }
}

// delete a recipe
exports.deleteRecipe = async (id, user_id) => {
    try{
        // check if recipe exists and it belongs to user
        const recipeExits = await Recipe.getByUserId(user_id);
        if(!recipeExits.length){
            throw new Error("Recipe doesn't exists");
        }
        const data = await Recipe.delete(id);
        return data;
    }catch(err){
        throw err;
    }
}