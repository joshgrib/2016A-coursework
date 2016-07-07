const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const recipeData = require("./recipes");
const uuid = require('node-uuid');

let exportedMethods = {
    getAllComments() {
        return recipeData.getAllRecipes().then( (all_recipes) => {
            let comment_list = [];
            all_recipes.forEach( (recipe) => {
                recipe.comments.forEach( (comment) => {
                    comment_list.push(comment);
                });
            });
            return comment_list;
        });
    },
    getCommentById(id){
        return recipeData.getAllRecipes().then( (all_recipes) => {
            resp_comment = {};
            all_recipes.forEach( (recipe) => {
                recipe.comments.forEach( (comment) => {
                    if(comment._id === id){
                        resp_comment = {'_id':id, 'recipeId':recipe._id, 'recipeTitle':recipe.title, 'comment':comment.comment, 'poster':comment.poster};
                    }
                });
            });
            return resp_comment;
        });
    },
    addComment(text, poster, recipe_id){
        return recipes().then( (recipeCollection) => {
            return recipeData.getRecipeById(recipe_id).then( (recipe) => {
                let newComment = {
                    _id: uuid.v4(),
                    poster: poster,
                    comment: text
                };
                recipe.comments.push(newComment);
                let updateCommand = { $set: recipe };
                return recipeCollection.updateOne({ _id: recipe_id }, updateCommand).then((result) => {
                    return this.getCommentById(newComment._id);
                });
            });
        });
    },
    removeComment(id){
        return recipes().then( (recipeCollection) => {
            return this.getCommentById(id).then( (comment_info) => {
                let recipe = recipeData.getRecipeById(comment_info.recipeId);
                return recipe.then( (recipe_info) => {
                    let new_arr = []
                    recipe_info.comments.forEach( (comment) => {
                        if(comment._id === id){
                            let i = recipe_info.comments.indexOf(comment);
                            if(i > -1){recipe_info.comments.splice(i, 1)};
                        }
                    });
                    return recipe;
                }).then( (new_recipe) => {
                    recipeData.updateRecipe(new_recipe._id, new_recipe);
                });
            });
        });
    },
    updateComment(id, updatedComment){
        return this.getCommentById(id).then( (info) => {
            return recipeData.getRecipeById(info.recipeId).then((recipe)=>{
                recipe.comments.forEach( (comment) => {
                    if(comment._id === id){
                        console.log(updatedComment);
                        if(updatedComment.comment){
                            comment.comment = updatedComment.comment;
                        }
                        if(updatedComment.poster){
                            comment.poster = updatedComment.poster;
                        }
                    }
                });
                return recipe;
            }).then( (updated_recipe) => {
                console.log(updated_recipe);
                return recipeData.updateRecipe(updated_recipe._id, updated_recipe);
            }).then( (new_recipe) => {
                return this.getCommentById(id);
            });
        });
    }
}

module.exports = exportedMethods;
