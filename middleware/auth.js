const User  = require("../models/users");
const token = require("../lib/token");

module.exports = {

    getPermissions(req, res, next) {
        const data = req.body.token || req.query.token || req.headers['x-accesstoken'];
        if(!data) {
            return next();
        }

        token.decode(token, (err, decoded) => {
            User.findById(decoded.iss, (err, usr) => {
                if(err) {
                    return next();
                }else if (usr) {
                    return next();
                } else {
                    req._token = decoded;
                    req._user  = usr;
                }
            })
        })
    }
}