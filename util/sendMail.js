require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

async function sendMail(mail) {
    const token = jwt.sign(
        { mail: mail },
        process.env.JWT_SECRET,
        { expiresIn: '200000m' }
    );

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        },
    });
    
    const link = `${process.env.DOMIN_LINK}/api/v1/auth/verify/${token}`;
    const html_tmp = `
        <div>
            <p>Click on the link below to verify your email</p>
            <a href="${link}">Verify</a>
        </div>
    `;

    const mail_conf = {
        from: process.env.MAIL,
        to: mail,
        subject: 'E-Commerce Verification mail',
        html: html_tmp
    };

    await transporter.sendMail(mail_conf);
};

module.exports = sendMail;