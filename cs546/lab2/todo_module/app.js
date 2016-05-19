const todo = require('./todo.js');

let testTask = todo.createTask('Todo test', 'A test task for the createTask method');
console.log(testTask);
todo.completeTask(testTask);
console.log(testTask);
