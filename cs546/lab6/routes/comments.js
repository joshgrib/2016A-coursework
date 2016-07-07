const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;
const commentData = data.comments;

router.get("/recipe/:recipeId", (req, res) => {
    //Returns a list of all comments in the specified recipe, in the format of: {_id: COMMENT_ID, recipeId: RECIPE_ID, reciipeTitle: RECIPE_TITLE, name: COMMENT_NAME, poster: COMMENT_POSTER}
    return recipeData.getRecipeById(req.params.recipeId).then( (recipe) => {
        let comment_list = [];
        recipe.comments.forEach( (comment) => {
            comment_list.push({'_id':comment._id, 'recipeId':recipe._id, 'recipeTitle':recipe.title, 'name':comment.comment, 'poster':comment.poster});
        });
        res.json(comment_list);
    }).catch((e) => {
        res.status(500).json({error: e });
    });
});

router.get("/:commentId", (req, res) => {
    //Returns the comment specified by that commentId in the format of {_id: COMMENT_ID, recipeId: RECIPE_ID, reciipeTitle: RECIPE_TITLE, name: COMMENT_NAME, poster: COMMENT_POSTER}
    commentData.getCommentById(req.params.commentId).then( (comment) => {
        res.json(comment);
    }).catch( () => {
        res.status(404).json({error: 'Comment not found'});
    });
});

router.post("/:recipeId/", (req, res) => {
    //Creates a new comment with the supplied data in the request body for the stated recipe, and returns the new comment
    let newCommentData = req.body;

    commentData.addComment(newCommentData.comment, newCommentData.poster, req.params.recipeId).then( (newComment) => {
        //res.json({status:"Done"});
        res.json(newComment);
    }).catch( (e) => {
        res.status(500).json({error: e});
    });
});

router.put("/:recipeId/:commentId", (req, res) => {
    //Updates the specified comment for the stated recipe with only the supplied changes, and returns the updated comment
    console.log('Not implemented yet...');
    res.status(500).json({'error':'Route not implemented yet'});
});

router.delete("/:id", (req, res) => {
    //Deletes the comment specified
    let getComment = commentData.getCommentById(req.params.id);
    getComment.then( (comment) => {
        return commentData.removeComment(req.params.id).then( (result) => {
            res.send(result); //res.sendStatus(200);
        }).catch( (e) => {
            res.status(500).json({error: e});
        });
    }).catch( (e) => {
        res.status(404).json({error: "Comment not found"});
    });
});

module.exports = router;


/*
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
*/
