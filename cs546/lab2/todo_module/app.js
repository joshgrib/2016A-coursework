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
