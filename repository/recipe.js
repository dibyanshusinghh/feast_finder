const knex = require("../db/db");

// get all recipes available
exports.getAll = async () => {
    try{
        const recipes = await knex("recipe")
                        .select("id", "user_id", "recipe", "description", "ingredients", "rating");
        return recipes;
    }catch(err){
        console.error(err);
        throw new Error("Error while fetching recipes");
    }
}

// get a recipe by id
exports.getById = async (id) => {
    try{
        const recipes = await knex("recipe")
                        .select("id", "user_id", "recipe", "description", "ingredients", "rating")
                        .where("id", id);
        return recipes;
    }catch(err){
        console.error(err);
        throw new Error("Error while fetching recipe by id");
    }
}

// get recipes by user_id
exports.getByUserId = async (user_id) => {
    try{
        const recipes = await knex("recipe")
                        .select("id", "user_id", "recipe", "description", "ingredients", "rating")
                        .where("user_id", user_id);
        return recipes;
    }catch(err){
        console.error(err);
        throw new Error("Error while fetching recipes by user_id");
    }
}

// create a recipe
exports.create = async (recipe) => {
    const trx = await knex.transaction();
    try{
        const id = await trx("recipe")
                        .insert(recipe)
                        .returning("id");
        trx.commit()
        return id;
    }catch(err){
        trx.rollback();
        console.error(err);
        throw new Error("Error while creating recipe");
    }
}

// update a recipe
exports.update = async (recipe) => {
    const trx = await knex.transaction();
    try{
        const id = await trx("recipe")
                        .where("id", recipe.id)
                        .update(recipe)
                        .returning("id");
        trx.commit();
        if(!id){
            throw new Error('Recipe not found');
        }
        return id;
    }catch(err){
        trx.rollback();
        console.error(err);
        throw new Error(err.message || "Error while updating recipe");
    }
}

// delete a recipe
exports.delete = async (id) => {
    const trx = await knex.transaction();
    try{
        const data = await trx("recipe")
                        .where("id", id)
                        .del();
        trx.commit();
        if(data == 0){
            throw new Error("Recipe not found");
        }
        return data;
    }catch(err){
        trx.rollback();
        console.error(err);
        throw new Error(err.message || "Error while deleting recipe");
    }
}