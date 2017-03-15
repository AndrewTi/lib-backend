const route = require("express").Router();
const book = require("../controllers/books.js");

route
    .get("/books/:id", book.findBook)
    // .get("/books/search")
    // .get("/books/:id/comment")
    // .post("/books/:id/comment")
    // .delele("/books/:id/comment")


module.exports = route;