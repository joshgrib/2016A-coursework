const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;
const commentData = data.comments;

router.get("/recipe/:recipeId", (req, res) => {
    //Returns a list of all comments in the specified recipe, in the format of: {_id: COMMENT_ID, recipeId: RECIPE_ID, reciipeTitle: RECIPE_TITLE, name: COMMENT_NAME, poster: COMMENT_POSTER}
    console.log('Not implemented yet...');
    res.status(500).json({'error':'Route not implemented yet'});
});

router.get("/:commentId", (req, res) => {
    //Returns the comment specified by that commentId in the format of {_id: COMMENT_ID, recipeId: RECIPE_ID, reciipeTitle: RECIPE_TITLE, name: COMMENT_NAME, poster: COMMENT_POSTER}
    console.log('Not implemented yet...');
    res.status(500).json({'error':'Route not implemented yet'});
});

router.post("/:recipeId/", (req, res) => {
    //Creates a new comment with the supplied data in the request body for the stated recipe, and returns the new comment
    console.log('Not implemented yet...');
    res.status(500).json({'error':'Route not implemented yet'});
});

router.put("/:recipeId/:commentId", (req, res) => {
    //Updates the specified comment for the stated recipe with only the supplied changes, and returns the updated comment
    console.log('Not implemented yet...');
    res.status(500).json({'error':'Route not implemented yet'});
});

router.delete(" /:id", (req, res) => {
    //Deletes the comment specified
    console.log('Not implemented yet...');
    res.status(500).json({'error':'Route not implemented yet'});
});

module.exports = router;


router.get("/:id", (req, res) => {
    postData.getPostById(req.params.id).then((post) => {
        res.json(post);
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});
router.get("/tag/:tag", (req, res) => {
    postData.getPostsByTag(req.params.tag).then((postList) => {
        res.json(postList);
    });
});
router.get("/", (req, res) => {
    postData.getAllPosts().then((postList) => {
        res.json(postList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});
router.post("/", (req, res) => {
    let blogPostData = req.body;

    postData.addPost(blogPostData.title, blogPostData.body, blogPostData.tags, blogPostData.posterId)
        .then((newPost) => {
            res.json(newPost);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});
router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getPost = postData.getPostById(req.params.id);

    getPost.then(() => {
        return postData.updatePost(req.params.id, updatedData)
            .then((updatedPost) => {
                res.json(updatedPost);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});
router.delete("/:id", (req, res) => {
    let getPost = postData.getPostById(req.params.id);

    getPost.then(() => {
        return postData.removePost(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});
