const nodemailer = require('nodemailer');
const config = require('../config/config.js');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

const sendReminder = async (event) => {
  const mailOptions = {
    from: config.EMAIL_USER,
    to: event.attendees.join(','),
    subject: `Reminder: ${event.title}`,
    text: `Don't forget about the upcoming event: ${event.title}.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendReminder };
