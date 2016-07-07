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

let comment1 = {
  "comment": "Hey this is a good recipe",
  "poster" : "Josh"
}
let comment2 = {
  "comment": "I tried this and it worked well",
  "poster" : "Josh"
}
let comment3 = {
  "comment": "This failed horribly for me...",
  "poster" : "Josh"
}

let recipe_arr = [eggs, toast];
let comment_arr = [comment3, comment2, comment1];
dbConnection().then( (db) => {
    return db.dropDatabase().then( ()=> {
        recipe_arr.forEach( (recipe) => {
            //console.log(`Adding recipe for '${recipe.title}'`);
            console.log(`Adding ${recipe.title}`);
            recipes.addRecipe(recipe.title, recipe.ingredients, recipe.steps)
            .then( (added_recipe) => {
                //the following is not pretty but this it wasn't working when chained in line
                console.log(`Adding comment to ${added_recipe.title}`);
                comments.addComment(comment1.comment, comment1.poster, added_recipe._id)
                .then( () => {
                    console.log(`Adding comment to ${added_recipe.title}`);
                    comments.addComment(comment2.comment, comment2.poster, added_recipe._id)
                    .then( () => {
                        console.log(`Adding comment to ${added_recipe.title}`);
                        comments.addComment(comment3.comment, comment3.poster, added_recipe._id);
                    });
                });
            });
        });
    })/*.then( () => {
    db.close();
    })*/;
}, (error) => {
    console.error(error);
});
