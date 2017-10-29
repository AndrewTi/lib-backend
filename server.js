const express    = require("express");
const mongoose   = require("mongoose");
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27017/library");
mongoose.connection.on('error', (err) => {
    console.log(err);
});

const app = express();

app.use(bodyParser.json());

app
    .use("/api", require("./route/books.js"))
    .use("/api", require("./route/users.js"))

    .use((err, req, res, next) => {
        res.status(err.statusCode || 200);
        
        if(err) {
            res.json({
                error: true,
                code: err.statusCode || 500,
                message: err.message
            });
        }
        next();
    })

app.listen(3007, ()=> {
    console.log("server listen: ", 3007, "port");
});

