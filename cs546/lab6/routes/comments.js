const express = require('express');
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;
const commentData = data.comments;

router.get("/recipe/:recipeId", (req, res) => {
    //Returns a list of all comments in the specified recipe, in the format of: {_id: COMMENT_ID, recipeId: RECIPE_ID, reciipeTitle: RECIPE_TITLE, comment: COMMENT_TEXT, poster: COMMENT_POSTER}
    recipeData.getRecipeById(req.params.recipeId).then( (recipe) => {
        let comment_list = [];
        recipe.comments.forEach( (comment) => {
            //console.log(comment);
            comment_list.push({'_id':comment._id, 'recipeId':recipe._id, 'recipeTitle':recipe.title, 'comment':comment.comment, 'poster':comment.poster});
        });
        return comment_list
    }).then( (c_list) => {
        res.json(c_list);
    }).catch((e) => {
        res.status(500).json({error: e });
    });
});

router.get("/:commentId", (req, res) => {
    //Returns the comment specified by that commentId in the format of {_id: COMMENT_ID, recipeId: RECIPE_ID, reciipeTitle: RECIPE_TITLE, comment: COMMENT_TEXT, poster: COMMENT_POSTER}
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

//Pretty sure I don't actually need recipeId here...
router.put("/:recipeId/:commentId", (req, res) => {
    //Updates the specified comment for the stated recipe with only the supplied changes, and returns the updated comment
    let updatedData = req.body;

    commentData.getCommentById(req.params.commentId).then( (comment_data) => {
        return commentData.updateComment(req.params.commentId, updatedData).then( (updatedComment) => {
            res.json(updatedComment);
        }).catch( (e) => {
            console.log(e);
            res.status(500).json({error: e});
        });
    }).catch( (e) => {
        console.log(e);
        res.status(404).json({ error: "Comment not found" });
    });
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
