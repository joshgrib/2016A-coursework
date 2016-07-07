const dbConnection = require("./config/mongoConnection");
const data = require("./data/");
const recipes = data.recipes;//was users
const comments = data.comments;//was posts


dbConnection().then(db => {
    console.log('Beginning to seed database!');//debugging
    return db.dropDatabase().then(() => {
        console.log('Setting up a new db connection');//debugging
        return dbConnection;
    }).then((db) => {
        console.log('Adding a new user');//debugging
        return users.addUser("Phil", "Barresi");
    }).then((phil) => {
        const id = phil._id;

        console.log('Adding post 1');//debugging
        return posts
            .addPost("Hello, class!", "Today we are creating a blog!", id)
            .then(() => {
                console.log('Adding post 2');//debugging
                return posts.addPost("Using the seed", "We use the seed to have some initial data so we can just focus on servers this week", id);
            })
            .then(() => {
                console.log('Adding post 3');//debugging
                return posts.addPost("Using routes", "The purpose of today is to simply look at some GET routes", id);
            });
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
