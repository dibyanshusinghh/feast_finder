const userBiz = require('../biz/userBiz');

exports.registerUser = async  (req, res) =>{
    try{
        const { name, email, password } = req.body;
        const user = await userBiz.registerUser(name, email, password);
        res.json({
            _id: user._id,
            token: user.token,
        });

    }catch(err){
        res.status(400).json({message: err.message, sucess: false});
    }
}

exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userBiz.loginUser(email, password);

        res.json({
            _id: user._id,
            token: user.token,
        });
        
    }catch(err){
        console.error(err);
        res.status(401).json({message: err.message, success: false});
    }
}