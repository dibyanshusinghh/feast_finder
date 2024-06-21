const express = require('express');
const userRouter = express.Router();
const {registerUser, loginUser} = require('../controller/userController');

// Registers a user
userRouter.post('/register', registerUser);

// login a user
userRouter.post('/login', loginUser);

module.exports = userRouter;
