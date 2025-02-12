require('dotenv').config();
const users = require('../database/user');
const sendMail = require('../util/sendMail');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function register (req, res) {
    try {
        if (!req || !req.body) {
            return res.status(400).send("Invalid request");
        }
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const { name, mail, pass } = req.body;

        if (!name || !mail || !pass) {
            return res.status(400).send('Name, email, and password are required');
        }
        if (!mail.match(emailRegex)) {
            return res.status(400).send("Invalid email foramt");
        }
        if (pass.length < 8) {
            return res.status(400).send("Password should at least 8 characters");
        }

        const is_exist = await users.find({ mail: mail});
        if (is_exist.length) {
            if (is_exist[0].is_verified) {
                return res.status(409).send('Email is already exist');
            }
            await users.deleteOne({ mail: mail });
        }

        await users.create({
            id: (await users.find()).length+1,
            name: name,
            mail: mail,
            pass: await bcrypt.hash(pass, 10)
        });
        
        await sendMail(mail);
        res.status(200).send('Verification mail sent');
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
};

async function verify (req, res) {
    if (!req || !req.params) {
        return res.status(406).send('Not a user');
    }

    try {
        const token = await jwt.verify(req.params.token, process.env.JWT_SECRET);
        const update = await users.updateOne(
            { mail: token.mail }, 
            {$set: { is_verified: true }}  
        );
        if(update.modifiedCount) {
            res.status(200).send('<h1>Account Now Verified</h1>');
        } else {
            res.status(404).send('Invalid link');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
};

async function login (req, res) {
    if (!req || !req.body) {
        return res.status(400).send("Invalid request");
    }

    const { mail, pass } = req.body;
    if (!mail || !pass) {
        return res.status(400).send('Email, and password are required');
    }

    const user = await users.find({ mail: mail });
    if (!user.length || !user[0].is_verified) {
        return res.status(401).send('Invalid email or password');
    }

    const unhash = await bcrypt.compare(pass, user[0].pass);
    if (unhash) {
        const token = await jwt.sign(
            { id: user[0].id, mail: mail, admin: user[0].is_admin },
            process.env.JWT_SECRET,
            { expiresIn: '2000000m' }
        );
        res.status(200).json({ message: 'login successful', token: token });
    } else {
        res.status(401).send('Invalid email or password');
    }
}

module.exports = {
    register,
    verify,
    login
};