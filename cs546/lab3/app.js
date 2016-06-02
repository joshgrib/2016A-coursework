'use strict'

const fileData = require('./fileData.js');
const textMetrics = require('./textMetrics.js');
var myGlobals = {testing: true};


console.log("=====TESTING textMetrics=====");

let res = textMetrics.createMetrics("Hello, my friends! This is a great day to say hello.");
console.log(res);

let res2 = textMetrics.createMetrics("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt vestibulum sem quis lacinia. Donec sed vulputate nisl. Quisque tristique quam a turpis convallis, at feugiat lacus luctus. Fusce finibus consectetur odio non placerat. Maecenas libero mauris, dignissim vulputate purus ut, consectetur hendrerit nisi. Nullam convallis ut mi malesuada volutpat. Vivamus ut nunc erat. Mauris porta urna nunc, tincidunt rhoncus sem commodo nec. Integer blandit, erat eget laoreet pharetra, mi urna imperdiet lectus, a vulputate urna eros at mauris.\n\nDuis ullamcorper sagittis faucibus. Curabitur aliquam hendrerit lacus, non accumsan felis molestie in. Sed vitae quam eros. Pellentesque venenatis iaculis tortor vitae tincidunt. Quisque pretium enim et massa commodo, sit amet aliquet libero elementum. Cras eu est dignissim, porttitor augue non, vehicula massa. Sed imperdiet ipsum sed mi pretium imperdiet. Quisque sed vulputate tortor. Proin eget erat venenatis, malesuada enim ac, dictum diam.");
console.log(res2);


console.log("=====TESTING fileData.js=====");

let text1 = fileData.getFileAsString('./chapter1.txt');
text1.then(
    function(resp){/*console.log(text1);*/},
    function(err){throw err;});

let text5 = fileData.getFileAsString();
text5.then(
    function(resp){console.log(text5);},
    function(err){throw err;});
console.log(text5);

let text2 = fileData.getFileAsJSON('./package.json');
text2.then(
    function(resp){console.log(text2);},
    function(err){throw err;});

let text3 = fileData.saveStringToFile('./test.txt', 'Hello Josh');
text3.then(
    function(resp){console.log(text3);},
    function(err){throw err;});

let text6 = fileData.saveStringToFile('./test.txt', undefined);
text6.then(
    function(resp){console.log(text6);},
    function(err){throw err;});
console.log(text6);

let text7 = fileData.saveJSONToFile('./test.txt', 5);
text7.then(
    function(resp){console.log(text7);},
    function(err){throw err;});
console.log(text7);

let obj = {};
obj.first = 'Josh';
obj.last = 'Gribbon';
obj.age = 20;
let text4 = fileData.saveJSONToFile('./test2.txt', obj);
text4.then(
    function(resp){console.log(resp);},
    function(err){throw err;});

let str_json = fileData.getFileAsJSON('./package.json');
str_json.then(
    function(resp){fileData.saveJSONToFile('./package2.json', str_json);},
    function(err){throw err;});

//printPromise(text1, 'chapter1.txt file as string');
//printPromise(text2, 'package.json file as JSON');
//printPromise(text3, 'Save string to file');
//printPromise(text4, 'Save JSON to file');


function printMetricsForFile(filename){
    let chap_string = fileData.getFileAsString('./chapter1.txt');
    chap_string.then(function(resp){
        let stats = textMetrics.createMetrics(resp);
        console.log(stats);
    }, function(error) {
        throw error;
    });
}


function printPromise(prom, label){
    //console.log('\n###Printing promise###');
    //console.log(label + ':\n');
    prom.then(function(resp){
        console.log(resp);
    }, function(error){
        throw error;
    });
}
