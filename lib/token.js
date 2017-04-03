const jwt     = require("jsonwebtoken");
const config    = require("../config");

module.exports = {
    create(id) {
        return jwt.sign(
            { iss: id }, 
            config.jwt.secret,
            { algorithm: config.jwt.algorithm, expiresIn: config.jwt.expiresIn }
        )
    },

    decode: (token, cb) => {
        jwt.verify(token, config.jwt.secret, cb);
    }
}