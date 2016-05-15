/*TODO
Update strings to use backtick thing
*/

function sumOfSquares(num1, num2, num3){
    /*
    Function to return the sum of squares of three numbers
    Return the result
    */
    var input = [num1, num2, num3];
    for(var i=0; i<3; i++){
        if(isNaN(input[i])){
            throw `Input Error: Argument ${i+1} - ${input[i]} is not a number (NaN).`;
        }
    }
    return (Math.pow(num1, 2) + Math.pow(num2, 2) + Math.pow(num3, 2));
}
console.log("----- TESTING sumOfSquares -----");
try{
    console.log(sumOfSquares(5, 3, 10));
    console.log(sumOfSquares(0, 0, 0));
    console.log(sumOfSquares(-5, 3, 120));
    console.log(sumOfSquares("a", 3, 10));
    console.log(sumOfSquares(5, 3, 10));//not printed
}catch(e){
    console.log(e);
}
try{
    console.log(sumOfSquares(3, "b", 10));
} catch(e) {
    console.log(e);
}
try{
    console.log(sumOfSquares(3, 10, "c"));
} catch(e) {
    console.log(e);
}
try{
    console.log(sumOfSquares(3, 10));
} catch(e) {
    console.log(e);
}
try{
    console.log(sumOfSquares());
} catch(e) {
    console.log(e);
}


function sayHelloTo(firstName, lastName, title){
    /*
    Function to say hello to someone with different phrases
    based on amount of inputs
    */
    str = '';
    if(firstName === undefined){
        throw "Input Error: No input given, 1-3 arguments required.";
    }
    if(typeof firstName !== 'string'){
        throw "Input Error: First name must be a string.";
    }
    if(title === undefined){
        if(lastName === undefined){
            //print first one
            //Hello, Phil!
            console.log(`Hello ${firstName}!`);
            return;
        }
        if(typeof lastName !== 'string'){
            throw "Input Error: Last name must be a string.";
        }
        //print middle thing
        //Hello, Phil Barresi. I hope you are having a good day!
        console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
        return;
    }
    if(typeof title !== 'string'){
        throw "Input Error: Title must be a string.";
    }
    //print full thing
    //Hello, Mr. Phil Barresi! Have a good evening!
    console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
    return;
}
console.log();
console.log("----- TESTING sayHelloTo -----");
sayHelloTo("Josh");
sayHelloTo("Josh", "Gribbon");
sayHelloTo("Josh", "Gribbon", "Mr.");
try{
    sayHelloTo();
} catch(e) {
    console.log(e);
}
try{
    sayHelloTo(4);
} catch(e) {
    console.log(e);
}
try{
    sayHelloTo("Josh", 3);
} catch(e) {
    console.log(e);
}
try{
    sayHelloTo("Josh", "Gribbon", 1);
} catch(e) {
    console.log(e);
}


function cupsOfCoffee(howManyCups){
    if(isNaN(howManyCups)){
        throw `Input Error: ${howManyCups.toString()} is not a number (NaN).`;
    }
    if(howManyCups < 1){
        throw "Value Error: Input is less than 1.";
    }
    if(howManyCups === 1){
        console.log("1 cup of coffee on the desk! 1 cup of coffee!");
        console.log("Pick it up, drink the cup, no more coffee left on the desk!");
        return;
    }else{
        console.log(`${howManyCups.toString()} cups of coffee on the desk! ${howManyCups.toString()} cups of coffee!`);
        var remaining = howManyCups - 1;
        var plurality = '';
        if(remaining > 1){
            plurality = 's';
        }
        console.log(`Pick one up, drink the cup, ${remaining.toString()} cup${plurality} of coffee on the desk!`);
        console.log();
        cupsOfCoffee(remaining);
    }
}
console.log();
console.log("----- TESTING cupsOfCoffee -----");
cupsOfCoffee(3);
try{
    cupsOfCoffee(0);
} catch(e) {
    console.log(e);
}
try{
    cupsOfCoffee("Josh");
} catch(e) {
    console.log(e);
}


function occurrencesOfSubstring(fullString, substring){
    if(typeof fullString !== 'string'){
        throw "Input Error: First argument must be a string."
    }
    if(typeof substring !== 'string'){
        throw "Input Error: Second argument must be a string."
    }
    count = 0;
    for(var i=0; i < (fullString.length-substring.length); i++){
        var thisSubStr = fullString.substring(i, i+substring.length);
        if(thisSubStr === substring){
            count++;
        }
    }
    return count;
}
console.log();
console.log("----- TESTING occurrencesOfSubstring -----");
console.log(occurrencesOfSubstring("hello world", "o"));
console.log(occurrencesOfSubstring("Helllllllo, class!", "ll"));
try{
    occurrencesOfSubstring("test", 1);
} catch(e) {
    console.log(e);
}
try{
    occurrencesOfSubstring(1, "test");
} catch(e) {
    console.log(e);
}
try{
    occurrencesOfSubstring("test");
} catch(e) {
    console.log(e);
}
try{
    occurrencesOfSubstring();
} catch(e) {
    console.log(e);
}


function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};
function randomizeSentences(paragraph){
    //build array by finding punctuation and adding from the last charAt marker to this one, then put them in an array, shuffle, and return the array concatenated together
    return;
}
console.log();
console.log("----- TESTING randomizeSentences -----");
var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
console.log(randomizeSentences(paragraph));

