const Recipe = require("../repository/recipe");
const Rating = require("../repository/rating");

// get all the ratings by a user
exports.getAllRatingByUser = async (user_id) => {
    try{
        const ratings = await this.getAllRatingByUser(user_id);
        return ratings;
    }catch(err){
        throw err;
    }
}

// get all the ratings for a recipe
exports.getAllRatingForRecipe = async (recipe_id) => {
    try{
        const ratings = await this.getAllRatingForRecipe(recipe_id);
        return ratings;
    }catch(err){
        throw err;
    }
}

exports.createRating = async (rating) => {
    try{
        // check if this recipe exists
        const recipeExists = await Recipe.getById(rating.recipe_id);
        if(!recipeExists.length){
            throw new Error("Recipe doesn't exists");
        }
        // check if rating for this recipe already exists
        const ratingExists = await Rating.getRatingByIds(rating.user_id, rating.recipe_id);
        if(ratingExists.length){
            throw new Error("Rating already exists for this recipe");
        }
        // check if user is rating their own recipe
        const selfRating = await Recipe.getByUserId(rating.user_id);
        const selfRecipes = selfRating.filter(recipe => recipe.id == rating.recipe_id);
        if(selfRecipes.length){
            throw new Error("You cannot rate your own recipe");
        }
        const id = await Rating.create(rating);
        const updatedRecipe = await Rating.updateFinalRating(rating.recipe_id);
        return updatedRecipe;
    }catch(err){
        throw new Error(err.message || "Error while creating rating");
    }
}

exports.updateRating = async (rating) => {
    try{
        // check if rating exists
        const ratingExists = await Rating.getRatingByIds(rating.user_id, rating.recipe_id);
        if(!ratingExists.length){
            throw new Error("rating doesn't exists");
        }
        // check if user is not rating their own recipe
        const selfRating = await Recipe.getByUserId(rating.user_id);
        const selfRecipes = selfRating.filter(recipe => recipe.id == rating.recipe_id);
        if(selfRecipes.length){
            throw new Error("You cannot update your own recipe rating");
        }
        const id = await Rating.update(rating);
        const updatedRecipe = await Rating.updateFinalRating(rating.recipe_id);
        return updatedRecipe;
    }catch(err){
        throw err;
    }
}

exports.deleteRating = async (user_id, recipe_id) => {
    try{
        // check if rating exists
        const ratingExists = await Rating.getRatingByIds(user_id, recipe_id);
        if(!ratingExists.length){
            throw new Error("rating doesn't exists");
        }
        // check if user is deleting their own rating
        if(ratingExists[0].user_id != user_id){
            throw new Error("You can't delete others' rating");
        }
        const id = await Rating.delete(user_id, recipe_id);
        const updatedRecipe = await Rating.updateFinalRating(recipe_id);
        return updatedRecipe;
    }catch(err){
        throw err;
    }
}