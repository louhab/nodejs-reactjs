const express = require("express");
const router = express.Router();
module.exports = router;
const { Posts } = require("../models");
const validatedToken = require('../middleware/AuthMiddleware');


router.get("/", validatedToken , async (req,res)=>{
    try {
        const allPosts = await Posts.findAll();
        res.json(allPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.post("/",validatedToken , async (req, res) => {
    try {
        var post = req.body; 
        await Posts.create(post);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:id", validatedToken ,async (req,res)=>{
    try {   
        const id = req.params.id
        const post = await Posts.findByPk(id);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

    
    