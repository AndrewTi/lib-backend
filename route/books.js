const route = require("express").Router();
const book = require("../controllers/books.js");

route
    .get("/books/", book.findBook)
    .get("/books/search", book.search)
    .post("/books/addBook", book.saveBook)
    .delete("/books", book.removeBook);
    // .get("/books/:id/comment")
    // .post("/books/:id/comment")
    // .delele("/books/:id/comment")


module.exports = route;