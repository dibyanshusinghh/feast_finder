const express = require('express');
const app = express();
const knex = require('./db/db');

const userRouter = require('./router/user');
const recipeRouter = require('./router/recipe');
const ratingRouter = require('./router/rating');
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter);
app.use('/api/rating', ratingRouter);

app.use('/', (req, res) => {
    res.status(200).send(`Server is up on port ${port}`)
})

app.listen(3000, () => {
    console.log(`server listening on port ${port}`);
});

