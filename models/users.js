const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
    name     : String,
    password : { type: String, select: false, trim: true },
    img      : String,
    email    : { type: String, lowercase: true, index: { unique: true, dropDups: true } },
    resetPass: String
}, {
    collection: "users"
})


module.exports = mongoose.model("User", Users);