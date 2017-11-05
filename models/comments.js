const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Comments = new Schema({
    date: { type: Date },
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    likes: [{ 
        user: { type: Schema.Types.ObjectId, ref: "User" },
        date: { type: Date }
    }]
}, { collection: "comments" });

module.exports = mongoose.model("Commnet", Comments);