const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", async (req, res) => {
    try {
    const { commentBody, PostId } = req.body;
         console.log(req.body.commentBody);
        console.log(req.body.PostId);
    if (!commentBody || !PostId) {
      return res.status(400).json({ error: 'commentBody and postId are required' });
    }
    const comment = await Comments.create({
      CommentBody: commentBody,
      PostId: PostId 
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;