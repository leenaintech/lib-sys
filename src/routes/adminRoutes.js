var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: "ABC",
        author: "PQR",
        genre: "Light",
        picturePath: "../src/resources/leena.jpg",
        read: false
    },
    {
        title: "the new morning",
        author: "Leena Bhai",
        genre: "Light",
        picturePath: "../src/resources/leena.jpg",
        read: false
    },
    {
        title: "How to be the best PM",
        author: "Siddharth Bhai",
        genre: "Tech",
        picturePath: "../src/resources/ananya.jpg",
        read: false
    }
];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return adminRouter;
}

module.exports = router;