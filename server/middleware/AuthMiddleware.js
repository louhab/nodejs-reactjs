// AuthMiddleware.js
const jwt = require('jsonwebtoken');
const validateToken = (req, res, next) => {
    const token = req.headers.authorization
    SECRET = "importantsecret";
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    const validatedToken = jwt.verify(token, SECRET);
    if (validatedToken) {
        return  next();  
    }
    
};

module.exports = validateToken;
