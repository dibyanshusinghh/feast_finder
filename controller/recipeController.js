const recipeBiz = require("../biz/recipeBiz");

exports.getAllRecipe = async (req, res) => {
    try{
        const recipes = await recipeBiz.getAllRecipe();
        res.status(200).json({recipes});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}

exports.getRecipeById = async (req, res) => {
    try{
        const id = req.params.id;
        const recipe = await recipeBiz.getRecipeById(id);
        res.status(200).json({recipe});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}

exports.getRecipeByUserId = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const recipe = await recipeBiz.getRecipeByUserId(user_id);
        res.status(200).json({recipe});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}

exports.createRecipe = async (req, res) => {
    try{
        const recipe = req.body;
        recipe.user_id = req.user_id;
        const [data] = await recipeBiz.createRecipe(recipe);
        res.status(200).json({id: data.id, message: "Recipe created successfully"});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}

exports.updateRecipe = async (req, res) => {
    try{
        const updatedRecipe = req.body;
        updatedRecipe.id = req.params.id;
        updatedRecipe.user_id = req.user_id;
        const [data] = await recipeBiz.updateRecipe(updatedRecipe);
        res.status(200).json({id: data.id, message: "Recipe updated successfully"});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}

exports.deleteRecipe = async (req, res) => {
    try{
        const id = req.params.id;
        const user_id = req.user_id;
        const data = await recipeBiz.deleteRecipe(id, user_id);
        res.status(200).json({data, message: "Recipe deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}