const jwt = require('jsonwebtoken');

async function checkUser(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            "error": "no auth header provided",
            "message": "login or register"
        });
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.token = token;
        next();
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = checkUser;