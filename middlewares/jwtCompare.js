const jwt = require('jsonwebtoken');
const config = require('../config/keys');


function  verifyToken(req,res, next) {
    const token = req.headers['x-access-token'];
    if(!token){
        return req.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded = jwt.verify(token, config.jwt_key);
    req.userId = decoded.id;
    next()
}

module.exports = verifyToken;

