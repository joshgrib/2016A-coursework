"use strict";
var myGlobals = {testing: true};


function sumOfSquares(num1, num2, num3) {
    /*
    Function to return the sum of squares of three numbers
    Return the result
    */
    var input = [num1, num2, num3];
    var i;
    for (i = 0; i < 3; i += 1) {
        if (isNaN(input[i])) {
            throw `Input Error: Argument ${i + 1} - ${input[i]} is not a number (NaN).`;
        }
    }
    return (Math.pow(num1, 2) + Math.pow(num2, 2) + Math.pow(num3, 2));
}
function testSumOfSquares() {
    console.log("----- TESTING sumOfSquares -----");
    try {
        console.log(sumOfSquares(5, 3, 10));
        console.log(sumOfSquares(0, 0, 0));
        console.log(sumOfSquares(-5, 3, 120));
        console.log(sumOfSquares("a", 3, 10));
        console.log(sumOfSquares(5, 3, 10));//not printed
    } catch (e1) {
        console.log(e1);
    }
    try {
        console.log(sumOfSquares(3, "b", 10));
    } catch (e2) {
        console.log(e2);
    }
    try {
        console.log(sumOfSquares(3, 10, "c"));
    } catch (e3) {
        console.log(e3);
    }
    try {
        console.log(sumOfSquares(3, 10));
    } catch (e4) {
        console.log(e4);
    }
    try {
        console.log(sumOfSquares());
    } catch (e5) {
        console.log(e5);
    }
}


function sayHelloTo(firstName, lastName, title) {
    /*
    Function to say hello to someone with different phrases
    based on amount of inputs
    */
    if (firstName === undefined) {
        throw "Input Error: No input given, 1-3 arguments required.";
    }
    if (typeof firstName !== 'string') {
        throw "Input Error: First name must be a string.";
    }
    if (title === undefined) {
        if (lastName === undefined) {
            //print first one
            //Hello, Phil!
            console.log(`Hello ${firstName}!`);
            return;
        }
        if (typeof lastName !== 'string') {
            throw "Input Error: Last name must be a string.";
        }
        //print middle thing
        //Hello, Phil Barresi. I hope you are having a good day!
        console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
        return;
    }
    if (typeof title !== 'string') {
        throw "Input Error: Title must be a string.";
    }
    //print full thing
    //Hello, Mr. Phil Barresi! Have a good evening!
    console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
    return;
}
function testSayHelloTo() {
    console.log();
    console.log("----- TESTING sayHelloTo -----");
    sayHelloTo("Josh");
    sayHelloTo("Josh", "Gribbon");
    sayHelloTo("Josh", "Gribbon", "Mr.");
    try {
        sayHelloTo();
    } catch (e1) {
        console.log(e1);
    }
    try {
        sayHelloTo(4);
    } catch (e2) {
        console.log(e2);
    }
    try {
        sayHelloTo("Josh", 3);
    } catch (e3) {
        console.log(e3);
    }
    try {
        sayHelloTo("Josh", "Gribbon", 1);
    } catch (e4) {
        console.log(e4);
    }
}


function cupsOfCoffee(howManyCups) {
    if (isNaN(howManyCups)) {
        throw `Input Error: ${howManyCups.toString()} is not a number (NaN).`;
    }
    if (howManyCups < 1) {
        throw "Value Error: Input is less than 1.";
    }
    if (howManyCups === 1) {
        console.log("1 cup of coffee on the desk! 1 cup of coffee!");
        console.log("Pick it up, drink the cup, no more coffee left on the desk!");
        return;
    }
    console.log(`${howManyCups.toString()} cups of coffee on the desk! ${howManyCups.toString()} cups of coffee!`);
    var remaining = howManyCups - 1;
    var plurality = '';
    if (remaining > 1) {
        plurality = 's';
    }
    console.log(`Pick one up, drink the cup, ${remaining.toString()} cup${plurality} of coffee on the desk!`);
    console.log();
    cupsOfCoffee(remaining);
}
function testCupsOfCoffee() {
    console.log();
    console.log("----- TESTING cupsOfCoffee -----");
    cupsOfCoffee(3);
    try {
        cupsOfCoffee(0);
    } catch (e1) {
        console.log(e1);
    }
    try {
        cupsOfCoffee("Josh");
    } catch (e2) {
        console.log(e2);
    }
}


function occurrencesOfSubstring(fullString, substring) {
    if (typeof fullString !== 'string') {
        throw "Input Error: First argument must be a string.";
    }
    if (typeof substring !== 'string') {
        throw "Input Error: Second argument must be a string.";
    }
    var count = 0;
    var i, thisSubStr;
    for (i = 0; i < (fullString.length - substring.length); i += 1) {
        thisSubStr = fullString.substring(i, i + substring.length);
        if (thisSubStr === substring) {
            count += 1;
        }
    }
    return count;
}
function testOccurrencesOfSubstring() {
    console.log();
    console.log("----- TESTING occurrencesOfSubstring -----");
    console.log(occurrencesOfSubstring("hello world", "o"));
    console.log(occurrencesOfSubstring("Helllllllo, class!", "ll"));
    try {
        occurrencesOfSubstring("test", 1);
    } catch (e1) {
        console.log(e1);
    }
    try {
        occurrencesOfSubstring(1, "test");
    } catch (e2) {
        console.log(e2);
    }
    try {
        occurrencesOfSubstring("test");
    } catch (e3) {
        console.log(e3);
    }
    try {
        occurrencesOfSubstring();
    } catch (e4) {
        console.log(e4);
    }
}


function randomizeSentences(paragraph) {
    if (typeof paragraph !== 'string') {
        throw "Input Error: Paragraph must be a string.";
    }
    var lastMarker = 0;
    var sentences = [];
    var delims = ['.', '?', '!'];
    var i, char, sentence;
    for (i = 0; i < paragraph.length; i += 1) {//make array of sentences
        char = paragraph.charAt(i);
        if (delims.indexOf(char) > -1) {//char is one of delims
            sentence = paragraph.slice(lastMarker, i + 1);
            sentence.trim();
            sentences.push(sentence);
            lastMarker = i + 1;
        }
    }
    var resp = '';
    var randIndex;
    while (sentences.length !== 0) {
        randIndex = Math.floor(Math.random() * (sentences.length - 0));
        resp += sentences.splice(randIndex, 1) + ' ';//remove index and add to response
    }
    resp = resp.trim();
    return resp;
}
function testRandomizeSentences() {
    console.log();
    console.log("----- TESTING randomizeSentences -----");
    var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
    console.log(randomizeSentences(paragraph));
    console.log(randomizeSentences("One. Two! Three? Four. Five."));
    try {
        console.log(randomizeSentences());
    } catch (e1) {
        console.log(e1);
    }
    try {
        console.log(randomizeSentences(1));
    } catch (e2) {
        console.log(e2);
    }
    try {
        console.log(randomizeSentences(['Hello', 'World']));
    } catch (e3) {
        console.log(e3);
    }
}


if (myGlobals.testing) {
    testSumOfSquares();
    testSayHelloTo();
    testCupsOfCoffee();
    testOccurrencesOfSubstring();
    testRandomizeSentences();
}
