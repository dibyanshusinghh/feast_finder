const knex = require("../db/db");


// create rating for a recipe
exports.create = async (rating) =>{
    const trx = await knex.transaction();
    try{
        const result = await trx("rating")
                        .insert(rating)
                        .returning("id");
        trx.commit();
        return result;
    }catch(err){
        trx.rollback();
        throw new Error("Error while creating rating");
    }
}

// update a rating
exports.update = async (rating) =>{
    const trx = await knex.transaction();
    try{
        const result = await trx("rating")
                        .where("user_id", rating.user_id)
                        .andWhere("recipe_id", rating.recipe_id)
                        .update(rating)
                        .returning("id");
        trx.commit();
        return result;
    }catch(err){
        trx.rollback();
        throw new Error("Error while creating rating");
    }
}

// delete a rating
exports.delete = async (user_id, recipe_id) =>{
    const trx = await knex.transaction();
    try{
        const result = await trx("rating")
                        .where("user_id", user_id)
                        .andWhere("recipe_id", recipe_id)
                        .del();
        trx.commit();
        return result;
    }catch(err){
        trx.rollback();
        throw new Error("Error while creating rating");
    }
}

// get all the ratings made by a user
exports.getAllRatingByUser = async (user_id) => {
    try{
        const ratings = await knex("rating")
                        .where("user_id", user_id)
                        .select("id", "user_id", "recipe_id", "rating");
        return ratings;
    }catch(err){
        console.error(err);
        throw new Error("Error while fetching ratings");
    }
}

// get all the ratings for a recipe
exports.getAllRatingForRecipe = async (recipe_id) => {
    try{
        const ratings = await knex("rating")
                        .where("recipe_id", recipe_id)
                        .select("id", "user_id", "recipe_id", "rating");
        return ratings;
    }catch(err){
        console.error(err);
        throw new Error("Error while fetching ratings");
    }
}

// get a rating by user_id and recipe_id
exports.getRatingByIds = async (user_id, recipe_id) => {
    try{
        const ratings = await knex("rating")
                        .where("recipe_id", recipe_id)
                        .andWhere("user_id", user_id)
                        .select("id", "user_id", "recipe_id", "rating");
        return ratings;
    }catch(err){
        console.error(err);
        throw new Error("Error while fetching ratings");
    }
}

// update the new avg. rating in the recipe table after creating/updating/deleting a rating
exports.updateFinalRating = async (recipe_id) => {
    const trx = await knex.transaction();
    try{
        const avgRating = await knex("rating")
                        .where("recipe_id", recipe_id)
                        .avg("rating")
                        .groupBy("recipe_id");

        const [data] = await trx("recipe")
                        .where("id", recipe_id)
                        .update({rating: parseFloat(avgRating[0]?.avg ? avgRating[0]?.avg : 0).toFixed(2)})
                        .returning(["id","recipe"]);

        trx.commit()
        return {id: data.id, recipe: data.recipe};
    }catch(err){
        trx.rollback();
        console.error(err);
        throw new Error("Error while updating ratings");
    }
}