const express = require('express');
const ratingRouter = express.Router();
const authMiddleware = require('../middleware/authenticate');
const Rating = require('../controller/ratingController');

// Inserts rating info
ratingRouter.post('/', authMiddleware.authenticate, Rating.createRating);

// Updates rating info by recipe id
ratingRouter.patch('/:recipe_id', authMiddleware.authenticate, Rating.updateRating);

// Deletes rating by recipe id
ratingRouter.delete('/:recipe_id', authMiddleware.authenticate, Rating.deleteRating);


module.exports = ratingRouter;