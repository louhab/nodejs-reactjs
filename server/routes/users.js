const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const validateToken = require("../middleware/AuthMiddleware");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        if (typeof password !== 'string') {
            return res.status(400).send("Password must be a string");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.create({
            username: username,
            password: hashedPassword,
        });
        res.send("User created successfully!");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (!user) return res.json({ error: "User Doesn't Exist" });
    if (typeof user.password !== 'string') {
        return res.status(500).send("Invalid user password format");
    }
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) return res.json({ error: "Wrong Username And Password Combination" });
        const accessToken = sign({ username: user.username, id: user.id },
        "importantsecret"
        );
        res.json(accessToken);
    }).catch(error => {
        console.error("Error comparing passwords:", error);
        res.status(500).send("Error comparing passwords");
    });
});
router.get("/validate/Token", validateToken , (req,res) => {
    res.json(req.user)
})
module.exports = router;
