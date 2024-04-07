const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    const SECRET = "importantsecret";
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.user = decodedToken; // Attach the user information to the request object
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = validateToken;
