const express = require('express');
const sendMail = express.Router();
const mailer = require('./mailer');

const { sendEmail } = mailer;

sendMail.post('/new_message', async (req, res, next) => {
    const { firstname, lastname, email, message } = req.body
    const email_to = 'zacharypritchard@gmail.com'
    const subject = 'New CF Message from: ' + firstname + ' ' + lastname
    const body = '<p><strong>Name: </strong>' + firstname + ' ' + lastname + '</p><p><strong>Email: </strong>' + email + '</p><p><strong>Message:</strong><p>' + message
    try {
        await sendEmail(email_to, subject, body);
        res.json('New Message successfully sent!');
        await next();
    } catch (e) {
        await next(e);
    }
});

sendMail.post('/message_received', async (req, res, next) => {
    const { firstname, email } = req.body
    const email_to = email
    const subject = 'Message received!'
    const body = "<p>Hi " + firstname + ",</p><p>Thanks for the message! I typically reply within a couple hours. If I'm busy though, it could be closer to 24 hours.</p><p>Cheers,</p><p>Zach</p>"
    try {
        await sendEmail(email_to, subject, body);
        res.json('Message Received successfully sent!');
        await next();
    } catch (e) {
        await next(e);
    }
});



module.exports = sendMail;