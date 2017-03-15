const route = require("express").Router();
const User = require("../controllers/users.js");

route
    .get("user/:id", User.find)
    .get("user/login", User.login)
    .get("user/singup", User.singup)
    .get("user/forgot", User.forgot)
    .get("user/search", User.search);


    module.exports = route;