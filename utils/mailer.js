const emailConfig = require('../email-config')();
const mailgun = require('mailgun-js')(emailConfig);

exports.sendEmail = (email, subject, body) =>
  new Promise((resolve, reject) => {
    const data = {
      from: 'Zach Pritchard <zacharypritchard@gmail.com>',
      to: email,
      subject: subject,
      text: body,
      html: body,
    };

    mailgun.messages().send(data, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });