const User = require('../repository/user');
const Token = require('../jwt');
const bcrypt = require('bcrypt');

exports.registerUser = async (name, email, password) => {
    try{
        // check if user already exists
        const userExists = await User.getByEmail(email);
    
        if (userExists.length) {
            throw new Error('User already exists');
        }
        // create entry with hashed password
        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        });
    
        if (user) {
            return {_id: user.id, token: Token.generateToken(user.id)}
        } else {
            throw new Error('Invalid user data');
        }
    }catch(err){
        console.error(err);
        throw err;
    }
}

exports.loginUser = async (email, password) => {
    try{
        // check if user already exists
        const userExists = await User.getByEmail(email);
        // compare password
        if(userExists.length && (await bcrypt.compare(password, userExists[0].password))){
            return { _id: userExists[0].id, token: Token.generateToken(userExists[0].id)}
        } else{
            throw new Error('Invalid email or password');
        }
        
    }catch(err){
        console.error(err);
        throw err;
    }
}