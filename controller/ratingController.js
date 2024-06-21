const ratingBiz = require("../biz/ratingBiz");


exports.createRating = async (req, res) => {
    try{
        const rating = req.body;
        rating.user_id = req.user_id;
        const result = await ratingBiz.createRating(rating);
        res.status(200).json({data: result, message: "Rating created successfully"});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}

exports.updateRating = async (req, res) => {
    try{
        const rating = req.body;
        rating.user_id = req.user_id;
        rating.recipe_id = req.params.recipe_id;
        const result = await ratingBiz.updateRating(rating);
        res.status(200).json({data: result, message: "Rating updated successfully"});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}

exports.deleteRating = async (req, res) => {
    try{
        const recipe_id = req.params.recipe_id;
        const user_id = req.user_id;
        const result = await ratingBiz.deleteRating(user_id, recipe_id);
        res.status(200).json({data: result, message: "Rating deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message, success: false});
    }
}