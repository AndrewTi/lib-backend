const route = require("express").Router();
const User = require("../controllers/users.js");

route
    .param("id", User._find)
    .post("/user/login", User.login)
    .post("/user/singup", User.create)
    .post("/user/forgot", User.forgot);
    // .get("user/reset-pass", User.resetPass)
    // .get("user/search", User.search)
    // .get('user/:id/update-ifno', User.updateInfo);


module.exports = route;