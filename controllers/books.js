const Books = require("../models/books.js");
const AppError = require('../lig/app-error.js');


module.exports = {
   async findBook(req, res, next) {
        const id = req.query.id;

        if(!id) next( new AppError(400) );

        let book = await Books.findById(id);

        (book)
            ? res.json(book)
            : next( new AppError(404) );
    },

   async search(req, res, next) {
        const search = req.query.search;

        if(!search) 
            return next( new AppError(400) );

        const regex = new RegExp(search,"g"),
              foundBooks = [];

        const books = await Books.find({});

        if(!books) {
            next( new AppError(404) );
        }else {
            foundBooks = books.filter(e => {
                if(e.keywords && e.keywords
                    .split(/,\s|,/)
                    .some(el => regex.test(el))) {
                        return e;
                    }
            });

            (foundBooks)
                ? res.json({ result: foundBooks })
                : next( new AppError(404) );

        }
    },

    async saveBook(req, res, next) {
        let {
            _user,
            body: {
                title,
                authors,
                keywords,
                body,
                img = null,
                hidden = false
            }} = req;

        if( title &&
            authors &&
            keywords &&
            body ) {

            const book = new Books({
                title,
                authors,
                published: _user._id,
                keywords,
                body,
                img,
                hidden
            });

            let result = await book.save();

            if(result) {
                res.json({ result });
            }else {
                next( new AppError(500) );
            }
        }else {
            next( new AppError(400) );
        }
    },

    async removeBook(req, res, next) {
        let {
            _user,
            body: { id }
        } = req;

        if(!id) return next( new AppError(400) );

        let book = await Books.findById(id);

        if(!book) {
            next( new AppError(404) );
        }else {
            
            if(book.published != _user._id) {
                next( new AppError(401) );
            }else {
                let del = await Books.findByIdAndRemove(id);

                (del) 
                    ? res.json({ removed: del._id })
                    : next( new AppError(500) );
            }
        }
    }
}