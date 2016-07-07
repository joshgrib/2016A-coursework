const dbConnection = require("./config/mongoConnection");
const data = require("./data/");
const recipes = data.recipes;//was users
const comments = data.comments;//was posts

let eggs = {
  "title": "Fried Eggs",
  "ingredients": [
    {
      "name": "Egg",
      "amount": "2 eggs"
    },
    {
      "name": "Olive Oil",
      "amount": "2 tbsp"
    }],
  "steps": [
    "First, heat a non-stick pan on medium-high until hot",
    "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
    "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
    "Gently pour the egg from the bowl onto the oil",
    "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
    "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
    "Remove from oil and plate",
    "Repeat for second egg"
  ],
  "comments": []
}

let toast = {
  "title": "Toast",
  "ingredients": [
    {
      "name": "Bread",
      "amount": "1 Piece"
    }],
  "steps": [
    "Put toast in toaster.",
    "Set toaster to desired setting and turn on",
    "Wait for toaster to finish",
    "Carefully remove toast and enjoy"
  ],
  "comments": []
}

dbConnection().then(db => {
    console.log('Beginning to seed database!');//debugging
    return db.dropDatabase().then(() => {
        console.log('Setting up a new db connection');//debugging
        return dbConnection;
    }).then((/*db*/) => {
        console.log('Adding egg recipe');//debugging
        return recipes.addRecipe(eggs.title, eggs.ingredients, eggs.steps);
    }).then((eggs) => {
        const recipe_id = eggs._id;

        console.log('Adding comments to egg recipe');//debugging
        return comments.addComment("Comment 1", "Poster 1", recipe_id).then((/*egg_comment_1*/) => {
            return comments.addComment("Comment 2", "Poster  ", recipe_id);
        }).then((/*egg_comment_2*/) => {
            return comments.addComment("Comment 3", "Poster 3", recipe_id);
        });
    }).then((/*egg_comment_3*/) => {
        console.log("Adding toast recipe");
        return recipes.addRecipe(toast.title, toast.ingredients, toast.steps);
    }).then((toast) => {
        const recipe_id = toast._id;

        console.log("Adding comment to toast recipe");
        return comments.addComment("Comment 1", "Poster 1", recipe_id).then((/*toast_comment_1*/) => {
            return comments.addComment("Comment 2", "Poster  ", recipe_id);
        }).then((/*toast_comment_2*/) => {
            return comments.addComment("Comment 3", "Poster 3", recipe_id);
        });
    }).then((/*toast_comment_3*/) => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
