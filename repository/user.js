const knex = require('../db/db');

// get user info by email
exports.getByEmail = async (email) => {
    try{
        const user = await knex('user')
            .select("id", "name", "email", "password")
            .where("email", email);

        return user;
    }catch(err){
        console.error(err);
        throw new Error(err);
    }
}

// insert user data in user table
exports.create = async (user) => {
    const trx = await knex.transaction();
    try{
        const [id] = await trx('user')
            .insert(user)
            .returning("id");
        
            trx.commit();
            return id
    }catch(err){
        trx.rollback();
        console.error(err);
        throw new Error(err);
    }
}


// get user info for id
exports.getById = async (id) => {
    try{
        const user = await knex('user')
            .select("id", "name", "email")
            .where("id", id);

        return user;
    }catch(err){
        console.error(err);
        throw new Error(err);
    }
}