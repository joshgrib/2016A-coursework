'use strict'

const fileData = require('./fileData.js');
const textMetrics = require('./textMetrics.js');
var myGlobals = {testing: true};

/*
console.log("=====TESTING fileData.js=====");

var text1 = fileData.getFileAsString('./chapter1.txt');
setTimeout(function(){console.log(text1)}, 2000);

var text2 = fileData.getFileAsJSON('./package.json');
setTimeout(function(){console.log(text2)}, 2000);

var text3 = fileData.saveStringToFile('./test.txt', 'Hello Josh');
setTimeout(function(){console.log(text3)}, 2000);

obj = {};
obj.first = 'Josh';
obj.last = 'Gribbon';
obj.age = 20;
var text4 = fileData.saveJSONToFile('./test.txt', obj);
setTimeout(function(){console.log(text4)}, 2000);
*/

console.log("=====TESTING textMetrics=====");

var res = textMetrics.createMetrics("Hello, my friends! This is a great day to say hello.");
console.log(res);
/*
{
    totalLetters: 39,
    totalWords: 11,
    uniqueWords: 10,
    longWords: 1,
    averageWordLength: 3.55,
    numberOfSentences: 2,
    textComplexity: 14.59
    wordOccurrences: {
        hello: 2,
        my: 1,
        friends: 1,
        this: 1,
        is: 1,
        a: 1,
        great: 1,
        day: 1,
        to: 1,
        say: 1
    }
}
*/

//printMetricsForFile('chapter1.txt');

function printMetricsForFile(filename){
    var chap_string = fileData.getFileAsString('./chapter1.txt');
    chap_string.then(function(resp){
        let stats = textMetrics.createMetrics(resp);
        console.log(stats);
    }, function(error) {
        throw error;
    });
}
