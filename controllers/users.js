

const passHash  = require("password-hash")
const token     = require("../config/");
const User      = require("../models/users.js");

module.exports = {
    login(req, res, next) {
        const data = req.body
        if(!(data.password && data.name)) {
            next();
        }

        User.findOne({ 
            name: data.name, 
            password: passHash.generate(data.password)
        }, (err, usr) => {
            if(err) {
                next();
            }else if(!usr) {
                next();
            } else {
                res.json({
                    result: {
                        user: usr.toJSON(),
                        token: token.create(usr._id)
                    }
                })
            }
        })
    },

    create(req, res, next) {
        const data = req.body, user;
        if(!data && !data.name && !data.password) {
            next();
        }

        user = new User({
            name: data.name,
            password: passHash.generate(data.password),
            img: data.img || null
        })

        user.save((err, usr) => {
            if(err) {
                next();
            }else if (usr) {
                next();
            }else {
                res.json({
                    result: {
                        user: usr.toJSON(),
                        token: token.create(usr._id)
                    }
                })
            }
        })
    }
}