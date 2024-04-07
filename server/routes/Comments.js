const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const validatedToken = require('../middleware/AuthMiddleware');

router.get("/:postId" , validatedToken ,  async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);

  } catch (error) {
    // Handle any errors that occur during data retrieval
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "An error occurred while fetching comments" });
  }
})

router.post("/"  , validatedToken ,   async (req, res) => {
  try {
    const { commentBody, PostId } = req.body;
    if (!commentBody || !PostId) {
      return res.status(400).json({ error: 'commentBody and postId are required' });
    }
    const comment = await Comments.create({
      CommentBody: commentBody,
      PostId: PostId,
      username: req.user.username
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedComment = await Comments.destroy({ where: { id: id } });

    if (deletedComment) {
      const comments = await Comments.findAll();
      res.json(comments);
    } else {
      res.status(404).json({ error: "Commentaire non trouvé." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du commentaire." });
  }
});

router.get("/", async (req, res) => {
  try {
    const comments = await Comments.findAll();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des commentaires." });
  }
});


module.exports = router;