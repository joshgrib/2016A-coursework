const recipeRoutes = require("./recipes");
const commentRoutes = require("./comments");

let constructorMethod = (app) => {
    app.use("/recipe", recipeRoutes);
    app.use("/comment", commentRoutes);
};

module.exports = {
    recipes: require("./recipes"),
    comments: require("./comments")
};
