const AppError  = require("../lib/app-error.js");
const generate  = require("generate-key");
const passHash  = require("password-hash");
const token     = require("../lib/token.js");
const User      = require("../models/users.js");

module.exports = {
    async _find(req, res, next) {
        const id = req.params.id;

        User.findById(id, (err, user) => {
            if(user) {
                req._user = user; 
                next();
            } else 
                next(new AppError(404));
        });

    },

    login(req, res, next) {
        const data = req.body;

        if(!(data.password && data.name)) return next( new AppError(400) );

        User.findOne({ 
            name: data.name, 
            password: passHash.generate(data.password)
        }, (err, usr) => {
            if(err) {
                next(new AppError(500));
            }else if(!usr) {
                next(new AppError(404));
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
        let { email, name, password } = req.body;

        if(!email && !password  && !name) {
            return next( new AppError(400) );
        }

        User.findOne({ email }, (err, exist) => {
            if(exist) {
                next( new AppError(409) );
            }else if(err) {
                next(err);
            }else {
                let user = new User({
                    name: data.name,
                    email: data.email,
                    password: passHash.generate(data.password),
                    img: data.img || null
                })
        
                user.save((err, usr) => {
                    if(err) {
                        next( new AppError(500) );
                    }else if (!usr) {
                        next( new AppError(404) );
                    }else {
                        res.json({
                            result: {
                                token: token.create(usr._id)
                            }
                        })
                    }
                })
            }
        })
    },

    forgot(req, res, next) {
        const email = req.query.email;

        if(!email) {
            return next( new AppError(404) );
        }

        User.findOne( { email }, (err, user) => {
            if(user) { 
                let code = generate.generateKey(25),
                    saveUser;
    
                user.resetPass = code;
                user.save( (err, saveUser) => {
                    if(saveUser.resetPass == code) {
                        res.json({ code, saveUser });
                    }else {
                        next( new AppError(500) );
                    }
                });
    
            }else {
                next( new AppError(404) );
            }

        });
    },
}