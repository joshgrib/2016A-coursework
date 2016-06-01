'use strict'
var fs = require('fs')

var getFileAsString = (path) => {
    /**
    This method will, when given a path, return a promise that resolves to a string with the contents of the files.
    If no path is provided, it will return a rejected promise.
    If there are any errors reading the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.
    */
    return new Promise( function(fulfill, reject){
        fs.readFile(path, 'utf-8', function(err, res){
            if (err) reject(err);
            else fulfill(res);
        });
    });
}
var getFileAsJSON = (path) => {
    /*
    This method will, when given a path, return a promise that resolves to a JavaScript object. You can use the JSON.parse function to convert a string to a JavaScript object (if it's valid!).
    If no path is provided, it will return a rejected promise.
    If there are any errors reading the file or parsing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.
    Hint: this function can be accomplished in approximately 3-4 lines. Don't overcomplicate it!
    */
    return new Promise( function(fulfill, reject){
        fs.readFile(path, 'utf-8', function(err, res){
            if (err) reject(err);
            else fulfill(JSON.parse(res));
        });
    });
}
var saveStringToFile = (path, text) => {
    /*
    This method will take the text supplied, and store it in the file specified by path. The function should return a promise that will resolve to true when saving is completed.
    If no path or text is provided, it will return a rejected promise.
    If there are any errors writing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.
    */
    return new Promise( function(fulfill, reject){
        fs.writeFile(path, text, function(err){
            if(err) reject(err);
        });
        fulfill(true);
    });
}
var saveJSONToFile = (path, obj) => {
    /*
    This method will take the obj supplied and convert it into a string so that it may stored as in a file. The function should return a promise that will resolve to true when saving is completed.
    If no path or obj is provided, it will return a rejected promise.
    If there are any errors writing the file, the returned promise will reject rather than resolve, passing the error to the rejection callback.
    */
    str_obj = JSON.stringify(obj);
    return saveStringToFile(path, str_obj);
}


module.exports = {
    getFileAsString : getFileAsString,
    getFileAsJSON : getFileAsJSON,
    saveStringToFile : saveStringToFile,
    saveJSONToFile : saveJSONToFile
}
