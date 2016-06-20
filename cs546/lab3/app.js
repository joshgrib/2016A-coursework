'use strict'

const fileData = require('./fileData.js');
const textMetrics = require('./textMetrics.js');

let ch1 = fileData.getFileAsString('./chapter1.txt');
ch1.then(
    function(ch1){
        console.log("########  Printing metrics for chapter 1  ########");
        let ch1metrics = textMetrics.createMetrics(ch1);
        console.log(ch1metrics);
        return fileData.getFileAsString('./chapter2.txt');
    },
    function(err){throw err;}
).then(
    function(ch2){
        console.log("\n\n########  Printing metrics for chapter 2  ########");
        let ch2metrics = textMetrics.createMetrics(ch2);
        console.log(ch2metrics);
        return fileData.getFileAsString('./chapter3.txt');
    },
    function(err){throw err;}
).then(
    function(ch3){
        console.log("\n\n########  Printing metrics for chapter 3  ########");
        let ch3metrics = textMetrics.createMetrics(ch3);
        console.log(ch3metrics);
    },
    function(err){throw err;}
);

