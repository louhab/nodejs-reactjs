const { verify } = require("jsonwebtoken");

const validatedToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({ error: "User not logged in" });

    try {
        const decodedToken = verify(accessToken, "important secret");
        if (decodedToken) {
            return next();    
        } 
    } catch (error) {
        return res.json({ error: "User not logged in" });   
    }
};

module.exports = validatedToken;

