const route = require("express").Router();
const book = require("../controllers/books.js");
const { getPermissions } = require('../middleware/auth.js');

route
    .get("/books/", book.findBook)
    .get("/books/search", book.search)
    .post("/books", getPermissions, book.saveBook)
    .delete("/books", getPermissions, book.removeBook);
    // .get("/books/:id/comment")
    // .post("/books/:id/comment")
    // .delele("/books/:id/comment")


module.exports = route;