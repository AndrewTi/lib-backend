const Books = require("../models/books.js");


module.exports = {
    findBook (req, res, next) {
        Books.find({id_book: req.params.id}, (err, book) => {
            if(err) {
                console.log(err);
                next();
            }else if(!book) {
                console.log("not found book");
                next();
            }else {
                res.json(book);
            }
        })
    }
}