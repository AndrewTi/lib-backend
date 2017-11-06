const AppError  = require("../lib/app-error.js");
const generate  = require("generate-key");
const passHash  = require("password-hash");
const token     = require("../lib/token.js");
const User      = require("../models/users.js");

module.exports = {
    async _find(req, res, next) {
        const id = req.params.id;

        let result = await User.findById(id);

        if(result) {
            req._user = result;
            next();
        }else {
            next( new AppError(404) );
        }

    },

    async login(req, res, next) {
        let { name, password } = req.body;

        if(!(password && name)) return next( new AppError(400) );

        let result = await User.findOne({ 
            name: name, 
            password: passHash.generate(password)
        });

        if(result) {
            res.json({
                result: {
                    token: token.create(usr._id)
                }
            })
        }else {
            next( new AppError(404) );
        }
    },

    async create(req, res, next) {
        let { email, name, password, img } = req.body;

        if(!email && !password  && !name) {
            return next( new AppError(400) );
        }

        let existUser = await User.findOne({ email });

        if(existUser) {
            return next( new AppError(409) );
        }

        let user = new User({
            name,
            email,
            password: passHash.generate(password),
            img: img || null
        });
          
        let saveUser = await user.save();

        if(saveUser) {
            res.json({ token: token.create(usr._id) })
        }
        
    },

    async forgot(req, res, next) {
        const email = req.body.email;

        if(!email) {
            return next( new AppError(404) );
        }

        let user = await User.findOne({ email });

        if(user) {
            let code = generate.generateKey(25),
                saveUser;

            user.resetPass = code;
            let saveUser = await user.save();

            if(saveUser.resetPass == code) {
                res.json({ code });
            }else {
                next( new AppError(500) );
            }

        }else {
            next( new AppError(404) );
        }
    },

    async getMe(req, res, next) {
        const user = req._user;

        let result = await user.populate("Book");

        res.json({ result });
    },

    async updateMe(req, res, next) {
        let {
            _user,
            body: {
                name,
                img
            }
        } = req;

        _user.name = name || _user.name;
        _user.img = img || _user.img;

        let saveUser = await _user.save();
        
        if(saveUser) {
            res.json({ ok: true, user: saveUser });
        }else {
            next( new AppError(500) );
        }
    }
}