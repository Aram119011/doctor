const jwt = require('jsonwebtoken');
const  config = require('../config/keys');

module.exports = function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(
            socket.handshake.query.token,
            "JWT",
            function (err, decoded) {
                if (err) return next(new Error("Authentication error"));
                socket.decoded = decoded; ///later from soket js we can use socket.decoded ->{ _id: '5f339bb4046ef73eacf99990' }
                next();
            }
        );
    } else {
        next(new Error("Authentication error"));
    }
};




