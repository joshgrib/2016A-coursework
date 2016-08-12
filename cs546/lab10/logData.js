var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js');
const uuid = require('node-uuid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var logsCollection = db.collection("logs");
        exports.getAllLogs = function() {
            //should already be promises
            return logsCollection.find({}).toArray();
        };
        exports.createLog = function(reqId, reqPath, reqMethod, cookies) {
            let newLog = {
                _id: uuid.v4(),
                requestId: reqId,
                requestPath: reqPath,
                requestMethod: reqMethod,
                cookies: cookies,
                timestamp: Date.now().toString()
            }
            return logsCollection.insertOne(newLog);
        };
    });


