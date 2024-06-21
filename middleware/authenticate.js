const jwt = require('jsonwebtoken');
const User = require('../repository/user');

exports.authenticate = async function (req, res, next) {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return res
        .status(401)
        .json({ message:'Authorization header required', success: false });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Token missing in authorization header', success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Invalid Request', success: false });
  }
};
