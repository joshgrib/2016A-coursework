const todoItems = require('./todo');

/*
console.log('###############################');
console.log('#   Testing lab 3 - todo.js   #');
console.log('#        Josh Gribbon         #');
console.log('#   CS546 - Web Programming   #');
console.log('###############################');
*/

var taskId = undefined;

let createdTask = todoItems.createTask("My First Task", "This is the first thing I need to do today");
createdTask.then( (newTask) => {
    console.log('Made a task:');
    console.log(newTask);
    taskId = newTask._id;
    return taskId;
});

let getTask = createdTask.then( (newTask) => {
    let taskProm = todoItems.getTask(newTask._id);
    let resp = taskProm.then( (task) => {
        console.log('\nGot a task:');
        console.log(task);
        return task;
    });
    return resp;
});

let upTask = getTask.then((newTask) => {
    let updatedTask = todoItems.updateTask(newTask);
    let printStuff = updatedTask.then( (task_updated) => {
        console.log('\nUpdated a task:');
        console.log(task_updated);
        return updatedTask;
    });
    return printStuff;
});

//Still not working :/          Promise { undefined }
let delTask = upTask.then((task) => {
    //console.log("Removing task");
    let remTask = todoItems.removeTask(task._id);
    let tryToGetTask = remTask.then( (resp) => {
        console.log('\nRemoved task:');
        console.log(remTask);
        return true;//todoItems.getTask(task._id);
    }).catch( (err) => {
        console.log(err);
    });
    return task;
}).catch( (err) => {
    console.log(err);
});
