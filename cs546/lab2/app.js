const todo = require('./todo.js');


console.log("-----TESTING createTask()-----");
let testTask = todo.createTask('Todo test', 'A test task for the createTask method');
console.log("New task:");
console.log(testTask);
try{
    todo.createTask();
} catch(e) {
    console.log(e);
}
try{
    todo.createTask("Title");
} catch(e) {
    console.log(e);
}
try{
    todo.createTask(4, "Description of 4");
} catch(e) {
    console.log(e);
}

console.log("\n-----TESTING completeTask()-----");
todo.completeTask(testTask);
console.log(testTask);
try{
    todo.completeTask(4);
} catch(e) {
    console.log(e);
}
try{
    todo.completeTask({title:"Title", description:"Description"});
} catch(e) {
    console.log(e);
}
try{
    todo.completeTask({id:"id", title:"Title"});
} catch(e) {
    console.log(e);
}
try{
    todo.completeTask({id:"id", description:"Description"});
} catch(e) {
    console.log(e);
}


const storage = require('./storage.js');

console.log("\n\n-----TESTING set()-----");
let first = storage.set("key", "value");
console.log(first);
let second = storage.set("2", "Josh");
console.log(second);
let third = storage.set(3, "Gribbon");
console.log(third);
try{
    storage.set();
} catch(e) {
    console.log(e);
}
try{
    storage.set("ID");
} catch(e) {
    console.log(e);
}

console.log("\n-----TESTING unset()-----");
storage.unset("key");
console.log(`Unset 'key'`);
try{
    storage.unset();
} catch(e) {
    console.log(e);
}
try{
    storage.unset(4);
} catch(e) {
    console.log(e);
}

console.log("\n-----TESTING get()-----");
let thisGet = storage.get(2);
console.log(`storage.get(2) = ${thisGet}`);
try{
    storage.get();
} catch(e) {
    console.log(e);
}
try{
    storage.get("key");
} catch(e) {
    console.log(e);
}
