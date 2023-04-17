const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID);

const sendEmail = (msg) => {
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.message);
    });
};

module.exports = sendEmail;
