const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
    title    : { type: String, trim: true },
    authors  : [{ name: String }],
    published: { type: Schema.Types.ObjectId, ref: "User"},
    keywords : { type: String, trim: true },
    body     : { type: String, trim: true },
    img      : String,
    hidden   : Boolean,
    meta: {
        likes: [{
            user: { type: Schema.Types.ObjectId, ref: "User" },
            date: Date
        }]
    }
}, {
    collection: "books"
})


module.exports = mongoose.model("Book", Book);