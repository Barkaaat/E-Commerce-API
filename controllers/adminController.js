const users = require("../database/user");
const sendMail = require("../util/sendMail");
const authController = require('./authController');
const bcrypt = require('bcrypt');

async function getAllUsers(req, res) {
    try {
        const user = await users.find();
        res.status(202).send(user);
    } catch(err) {
        res.status(400).send(err.message);
    }
};

async function addAdmin(req, res) {
    if (!req || !req.params.id) {
        return res.status(400).send('Invalid Request');
    }
    try {
        const added = await users.updateOne({ id: req.params.id }, { $set: { is_admin: true } });
        if (added.modifiedCount) {
            res.status(202).send('Admin successflly added');
        } else {
            res.status(404).send('Admin not added');
        }
    } catch(err) {
        res.status(400).send(err.message);
    }
};

async function updateUser(req, res) {
    if (!req || !req.params.id || !req.body) {
        return res.status(400).send('Invalid Request');
    }
    try {
        const user = await users.find({ id: req.params.id });
        if (!user.length) {
            return res.status(404).send('User not found');
        } else {
            const { name, mail, pass } = req.body;
            if (pass) {
                if (pass.length < 8) {
                    return res.status(400).send("Password should at least 8 characters");
                }
            }
            if (mail) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!mail.match(emailRegex)) {
                    return res.status(400).send("Invalid email foramt");
                }
            }
            if (name) {
                await users.updateOne({ id: req.params.id }, { $set: { name: name } });
            }
            if (pass) {
                await users.updateOne({ id: req.params.id }, { $set: { pass: await bcrypt.hash(pass, 10) } });
            }
            if (mail) {
                await users.updateOne({ id: req.params.id }, { $set: { is_verified: false, mail: mail} });
                await sendMail(mail);
            }

            res.status(201).send('User updated successflly');
        }
    } catch(err) {
        res.status(400).send(err.message);
    }
};

async function deleteUser(req, res) {
    if (!req || !req.params.id) {
        return res.status(400).send('Invalid Request');
    }
    try {
        const deleted = await users.deleteOne({ id: req.params.id });
        if (deleted.deletedCount) {
            res.status(202).send('User deleted successflly');
        } else {
            res.status(404).send('User not deleted');
        }
    } catch(err) {
        res.status(400).send(err.message);
    }
};

module.exports = {
    getAllUsers,
    addAdmin,
    updateUser,
    deleteUser
};