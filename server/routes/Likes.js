const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const validateToken = require("../middleware/AuthMiddleware");

router.post("/", validateToken, async (request, response) => {
    // by Louhab abderazzak 
    const PostId = request.body.PostId;
    const UserId = request.user.id;
    console.log(UserId);
    if (!PostId || !UserId) {
        return response.status(400).json({ error: 'PostId or UserId is missing or invalid' });
    }

    const found = await Likes.findOne({ where: { UserId: UserId, PostId: PostId } });
    if (!found) {
        await Likes.create({ UserId: UserId, PostId: PostId });
        return response.json("The post was liked");
    } else {
        await Likes.destroy({ where: { UserId: UserId, PostId: PostId } });
        return response.json("The like was removed");
    }

    // by Louhab abderazzak 
 
});
module.exports = router;
