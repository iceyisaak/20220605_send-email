const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

const sendEmailEthereal = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPERTER_PORT,
    auth: {
      user: process.env.TRANSPORTER_AUTH_USER,
      pass: process.env.TRANSPORTER_AUTH_PASS
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Iceyisaak" <me@iceyisaak.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<h2>Test Nodemailer</h2>", // html body
  });

  res.json(info);
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'fabiola.reichel2@ethereal.email', // Change to your recipient
    from: 'me@iceyisaak.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  const info = await sgMail.send(msg);
  res.json(info);

};

module.exports = sendEmail;