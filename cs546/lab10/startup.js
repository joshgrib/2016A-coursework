var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    uuid = require('node-uuid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
    return MongoClient.connect(fullMongoUrl)
        .then(function(db) {
            return db.createCollection("movies");
        }).then(function(movieCollection) {

            return movieCollection.count().then(function(theCount) {
                // the result of find() is a cursor to MongoDB, and we can call toArray() on it
                if (theCount > 0) {
                    return movieCollection.find.toArray();
                }

                return movieCollection.insertOne({ _id: uuid.v4(), title: "The Last Samurai", rating: 4.5 }).then(function(newDoc) {
                    return newDoc;
                }).then(function() {
                    return movieCollection.insertOne({ _id: uuid.v4(), title: "X-Men", rating: 3 });
                }).then(function() {
                    return movieCollection.insertOne({ _id: uuid.v4(), title: "The Godfather", rating: 5 });
                }).then(function() {
                    return movieCollection.insertOne({ _id: uuid.v4(), title: "George Of The Jungle", rating: 1.6 });
                }).then(function() {
                    return movieCollection.insertOne({ _id: uuid.v4(), title: "Batman: The Dark Knight Rises", rating: 5 });
                }).then(function() {
                    return movieCollection.find().toArray();
                });
            });
        });
}

// By exporting a function, we can run
var exports = module.exports = runSetup;
