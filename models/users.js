const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    password: { type: String, select: false },
    author: [{ book: String, id: Number, date: Date }],
    img: String,
    email: { type: String, index: {unique: true, dropDups: true} },
    comments: [{ book: String, body: String, date: Date }],
    resetPass: String
}, {
    collection: "users"
})


module.exports = mongoose.model("User", User);