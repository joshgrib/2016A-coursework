var uuid = require('node-uuid');

module.exports = {

    createTask: (title, description) => {
        /*
         * Create a new task with the given title and description
        */
        if (typeof title != 'string'){
            throw "Title must be a string";
        }
        if (typeof description != 'string'){
            throw "Description must be a string";
        }
        resp = {
            id: uuid.v4(),//v4 is random, v1 is time based
            title: title,
            description: description,
            completed: false,
            timeCompleted: null
        }
        return resp;
    },

    completeTask: (task) => {
        /*
         * Set the task to be completed at the current time
        */
        if (task.id == undefined ||
            task.title == undefined ||
            task.description == undefined){
            throw "Input is not a valid task";
        }
        task.completed = true;
        task.timeCompleted = Date.now();
        //no need to return task, it just updates the original
    }

}

