const nodemailer = require('nodemailer');
const hbs = require('hbs');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS 
    }
});

const generateHtml = (filename, options={}) => {
  const html = hbs.compile(fs.readFileSync((__dirname, `./views/mail/${filename}.hbs`), 'utf8'));
  return html(options);
};

exports.send = (options) => {
  const html = generateHtml(options.filename, options);
  const mailOptions = {
    from    : "💩🔥💩el mero mero💩🔥💩<noreply@rmayoelmeromeroqlero.com>"
    ,to     : options.email
    ,subject: options.subject
    ,text   : options.message
    ,html
  }
  return transporter.sendMail(mailOptions);
};