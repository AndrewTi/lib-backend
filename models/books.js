const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Books = new Schema({
    title: String,
    authors: [{name: String, id: Number}],
    keyWords: String,
    body: String,
    img: String,
    comments: [{user: Number, body: String, date: Date}],
    hidden: Boolean,
    add: Number,
    meta: {
        likes: Number,
        rate: Number
    }
}, {
    collection: "books"
})


module.exports = mongoose.model("Books", Books);