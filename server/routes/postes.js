const express = require("express");
const router = express.Router();
module.exports = router;
const validatedToken = require('../middleware/AuthMiddleware');
const { Posts, Likes } = require("../models");


router.get("/" , validatedToken , async (req,res)=>{
    try {
        const allPosts = await Posts.findAll({ include: [Likes] });
        res.json(allPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.post("/" , validatedToken , async (req, res) => {
    try {
        var post = req.body; 
        await Posts.create(post);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:id", validatedToken, async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
      console.log(post)
        res.json(post);
})

    
    