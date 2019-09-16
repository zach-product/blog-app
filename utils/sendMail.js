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
    const signature = "<p>--<br/><strong>Zach Pritchard</strong><br/><i>Product Manager</i><br/><a href='https://zacharypritchard.com' target='_blank' rel='noopener noreferrer'>zacharypritchard.com</a></p><p><a href='http://bit.ly/zp_linkedin' target='_blank' rel='noopener noreferrer'><img src='https://images2.imgbox.com/8c/28/aylklJ0P_o.png'/></a> <a href='http://bit.ly/zp_twitter' target='_blank' rel='noopener noreferrer'><img src='https://images2.imgbox.com/30/96/GIucfPtt_o.png'/></a> <a href='http://bit.ly/zp_angellist' target='_blank' rel='noopener noreferrer'><img src='https://images2.imgbox.com/0b/4f/XKFtLXgX_o.png'/></a></p>"    
    const body = "<p>Hi " + firstname + ",</p><p>Thanks for the message! I typically reply within a couple hours. If I'm busy though, it could be closer to 24 hours.</p><p>Cheers,<br/>Zach</p>" + signature
    
    try {
        await sendEmail(email_to, subject, body);
        res.json('Message Received successfully sent!');
        await next();
    } catch (e) {
        await next(e);
    }
});



module.exports = sendMail;