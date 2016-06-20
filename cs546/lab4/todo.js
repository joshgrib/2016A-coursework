var uuid = require('node-uuid');
const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;

/*
 * This function will return a promise that resolves to a newly
 * created to-do list object.
 * This task will be stored in the todoItems collection.
 * If the task cannot be created, the method should reject.
 */
let createTask = (title, description) => {
    if (typeof title != 'string'){
        throw `Input Error: Title must be a non-null string\n    Received: ${title}`;
    }
    if (typeof description != 'string'){
        throw `Input Error: Description must be a non-null string\n    Received: ${description}`;
    }
    //console.log(`Creating task '${title}'`);
    return todoItems().then((todoCollection) => {
        let newItem = {
            id : uuid.v4(),
            title: title,
            description: description,
            completed: false,
            timeCompleted: null
        };
        return todoCollection.insertOne(newItem).then((
            newInsertInfo) => {
            return newInsertInfo.insertedId;
        },(err) => {throw err}
        ).then((newId) => {
            return getTask(newId);
        },(err) => {throw err});
    },(err) => {throw err});
}

/*
 * This function will return a promise that resolves to a task
 * from the database, when given an id.
 * If the task does not exist, the method should reject.
 */
let getTask = (id) => {
    //console.log(`Getting task for id:${id}`);
    return todoItems().then(
        (todoCollection) => {
            return todoCollection.findOne({ _id: id });
        },(err) => {throw err}
    );
}

/*
 * This function will modify the task in the database.
 * If the task cannot be updated (does not exist, etc), the
 * method should reject.
 */
let updateTask = (updatedTask) => {
    //console.log(`Updating task '${updatedTask.title}'`);
    updatedTask.completed = true;
    updatedTask.timeCompleted = Date.now();
    let updateDB = todoItems().then((todoCollection) => {
        todoCollection.updateOne( { _id: updatedTask._id }, updatedTask);
    });
    let resp = updateDB.then( () => { return updatedTask; });
    return resp;
}

/*
 * This function will remove the task from the database.
 * If the task cannot be removed (does not exist), the method should reject.
 */
let removeTask = (id) => {
    //console.log(`Removing task _id:${id}`);
    let resp = todoItems().then((todoCollection) => {
        let resp = todoCollection.removeOne({ _id: id }).then((deletionInfo) => {
            if(deletionInfo.deletedCount === 0){
                throw `Could not delete todo item with id:${id}`;
            }
        },(err) => {throw err});
    },(err) => {throw err});
    return resp;
}

module.exports = {
    createTask : createTask,
    getTask : getTask,
    updateTask : updateTask,
    removeTask : removeTask
}
