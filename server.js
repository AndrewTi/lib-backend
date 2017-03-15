const express   = require("express");
const mongoose  = require("mongoose");

mongoose.connect("mongodb://localhost:27017/library");
mongoose.connection.on('error', (err) => {
    console.log(err);
});

const app = express();

app
    .use("/api", require("./route/books.js"));
    // .use("/api", require("./route/users.js"))

app.listen(3007);

