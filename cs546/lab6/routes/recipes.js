const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;
const commentData = data.comments;

router.get("/", (req, res) => {
    //Responds with a list of all recipes in the format of {_id: RECIPE_ID, title: RECIPE_TITLE}
    recipeData.getAllRecipes().then((recipeList) => {
        let resp_list = [];
        recipeList.forEach( (recipe) => {
            resp_list.push({'_id':recipe._id, 'title':recipe.title});
        });
        res.json(resp_list);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/:id", (req, res) => {
    //Responds with the full content of the specified recipe
    recipeData.getRecipeById(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

router.post("/", (req, res) => {
    //Creates a recipe with the supplied data in the request body, and returns the new recipe
    let newRecipeData = req.body;

    recipeData.addRecipe(newRecipeData.title, newRecipeData.ingredients, newRecipeData.steps)
        .then((newRecipe) => {
            res.json(newRecipe);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    //Updates the specified recipe with only the supplied changes, and returns the updated recipe
    let updatedData = req.body;

    let getRecipe = recipeData.getRecipeById(req.params.id);

    getRecipe.then(() => {
        return recipeData.updateRecipe(req.params.id, updatedData)
            .then((updatedRecipe) => {
                res.json(updatedRecipe);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

router.delete("/:id", (req, res) => {
    //Deletes the recipe
    let getRecipe = recipeData.getRecipeById(req.params.id);

    getRecipe.then(() => {
        return recipeData.removeRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

module.exports = router;
