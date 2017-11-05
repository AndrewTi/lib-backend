const User  = require("../models/users");
const token = require("../lib/token");
const AppError = require("../lib/app-error.js");

module.exports = {

    getPermissions(req, res, next) {
        const data = req.body.token || req.headers['x-accesstoken'];
        if(!data) {
            return next();
        }

        token.decode(token, (err, decoded) => {
            User.findById(decoded.iss, (err, usr) => {
                if(err) {
                    next( new AppError(500) );
                }else if (!usr) {
                    next( new AppError(401) );
                } else {
                    req._token = decoded;
                    req._user = usr;
                    next();
                }
            })
        })
    }
}