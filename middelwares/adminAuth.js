const jwt = require('jsonwebtoken');

async function checkAdmin(req, res, next) {
    if (!req || !req.headers.authorization) {
        return res.status(400).send('Invalid request');
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.admin) {
            next();
        } else {
            res.status(401).send('Not Admin');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = checkAdmin;