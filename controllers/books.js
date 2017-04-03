const Books = require("../models/books.js");


module.exports = {
    findBook(req, res, next) {
        Books.findById(req.query.id, (err, book) => {
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
    },

    search(req, res, next) {
        const promise = new Promise((resovle, err) => {
            Books.find({}, (err, data) => {
                if(err) {
                    console.log("err");
                }else if(!data) {
                    console.log("no data");
                }else {
                    let arr = [];
                    let regex = new RegExp(req.query.search,"g");
                    data.forEach(e => {

                        if(e.keywords && e.keywords
                                .split(/,\s|,/)
                                .some(el => regex.test(el))) {
                                    arr.push(e);
                                }
                    })
                    resovle(arr);
                }
            })
        });

        promise.then(data => {
            res.json(data);
            next();
        })
        
    },

    saveBook(req, res, next) {
        let addData = new Books({
            title: "Hello world",
            authors: [{name: "Andrew"}, {name: "Andrew2"}],
            keywords: "world, hello, Andrew",
        })

        addData.save((err, save) => {
            console.log(save);
            next();
        })
    },

    removeBook(req, res, next) {
        Books.findByIdAndRemove(req.body.id, (err, book) => {
            if(err) {
                console.log("not remove");
                next();
            }else if(!book) {
                console.log("not found book");
                next();
            }else {
                console.log("delete success", book._id);
                next();
            }
        });
    }
}